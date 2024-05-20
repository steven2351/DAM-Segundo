const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

const PORT = 3000;

// Set up the connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'steven',
    password: 'steven',
    database: 'spkeasex'
});

const users = {};

// When a client connects to the socket
io.on('connection', async (socket) => {
    console.log('a user has connected!')


    const username = socket.handshake.auth.username;
    users[username] = socket.id;
     console.log('Current participants:', Object.keys(users));
    // To handle the event for joining a room
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        // Emit a room join event to all clients in the room
        io.to(roomId).emit('user_joined_room', { username, roomId });
        console.log(`${username} has joined room ${roomId}`);
        
    });

    // To handle the event for leaving a room
    socket.on('leaveRoom', ({ roomId }) => {
        socket.leave(roomId);
        console.log(`${username} left the room ${roomId}`);
    });

    
    socket.on('mensaje', ({ mensaje, roomId, horaActual, conversacionId, file, fileName, fileType }) => {
        const messageData = { mensaje, username, horaActual, file, fileName, fileType };
        io.to(roomId).emit('chat message', messageData);
        let result;
        try {
            let contenidoMensaje = connection.escape(mensaje);

            // Add the file to the message content if it exists
            if (file) {
                const fileLink = ` <a href="${file}" download="${fileName}">${fileName}</a>`;
                contenidoMensaje += connection.escape(fileLink);
            }

            result = `INSERT INTO mensajes (id, contenido, fecha_envio, remitente_id, conversacion_id)
                      VALUES (NULL, ${contenidoMensaje}, '${horaActual}', 
                              (SELECT id FROM usuarios WHERE nombre_usuario = '${username}'), 
                              '${conversacionId}')`;

            // Execute the SQL query
            connection.query(result, (error, results) => {
                if (error) {
                    console.error('Error executing the query: ', error);
                }
            });
        } catch (e) {
            console.error(e);
            return;
        }

        console.log(`Message sent to the room ${roomId}: ${mensaje}`);
    });
    
    // Listen for event to initiate a call in a specific room
    socket.on('startCall', (roomName, contactoUsername) => {
        // Join the specified room
        socket.join(roomName);
        console.log(`User ${username} initiated a call in room ${roomName}`);

        // Emit event to all clients in the room to notify the call
        io.to(roomName).emit('callStarted', username, contactoUsername);
    });
    
    socket.on('startVideoCall', (roomName, contactoUsername) => {
        // Join the specified room
        socket.join(roomName);
        console.log(`User ${username} initiated a videocall in room ${roomName}`);

        // Emit event to all clients in the room to notify the call
        io.to(roomName).emit('videocallStarted', username, contactoUsername);
    });
    
    socket.on('audioStream', (data) => {
        const { stream, roomId } = data;
        socket.join(roomId);
        // Forward the audio stream to all clients in the same room except the client who sent it
        io.to(roomId).emit('audioReceived', stream, username);
    });
    
    // Forward the received data to all connected clients
    socket.on('mediaStream', (data) => {
        const { data: mediaData, roomId, contactoUsername } = data;
            console.log(`MediaStream received for ${contactoUsername}`);
        const recipientSocketId = users[contactoUsername];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('mediaStreamReceived', mediaData, contactoUsername);
        } else {
            console.error(`User ${contactoUsername} not found `);
        }
    });

    
    socket.on('hangup', (roomId) => {
        // Forward the audio stream to all clients in the same room except the client who sent it
        io.to(roomId).emit('callFinished', username);
    });
    
    // To handle the user disconnection event
    socket.on('disconnect', () => {
        if (users[username]) {
            console.log(`${username} has disconnected from the chat`);
            delete users[username]; // Remove the user from the registry upon disconnection
            // Emit user disconnection event to all connected clients
            io.emit('user_disconnected', username);
        }
    });

});


// Set up the template engine
app.set('view engine', 'ejs');

// Session variables
const session = require('express-session');
app.use(session({
	secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Middleware to parse HTTP request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for serving static files from the 'public' directory
app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/register', (req, res) => {
    res.render('register');
});


// Route to get the contacts of the user
app.post('/contactos', (req, res) => {
    const usuario = req.body.usuario;
    const query = `
        SELECT * FROM contactos 
        LEFT JOIN usuarios 
        ON contactos.contacto_usuario_id = usuarios.id 
        WHERE contactos.usuario_id = (SELECT id FROM usuarios WHERE nombre_usuario = '${usuario}')
        ORDER BY usuarios.nombre_usuario;
    `;

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error while retrieving contacts: ', error.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.json(results);
    });
});


app.post('/mensajes', (req, res) => {
    const usuarioPrincipal = req.body.usuarioPrincipal;
    const contactoUsername = req.body.contactoUsername;

    const query = `
        SELECT * 
        FROM mensajes
        LEFT JOIN conversaciones ON conversaciones.id = mensajes.conversacion_id
        LEFT JOIN usuarios ON mensajes.remitente_id = usuarios.id
        LEFT JOIN participantes AS p1 ON conversaciones.id = p1.conversacion_id
        LEFT JOIN participantes AS p2 ON conversaciones.id = p2.conversacion_id
        WHERE 
            p1.usuario_id = (SELECT id FROM usuarios WHERE nombre_usuario = '${usuarioPrincipal}') AND 
            p2.usuario_id = (SELECT id FROM usuarios WHERE nombre_usuario = '${contactoUsername}')
        ORDER BY mensajes.fecha_envio DESC;
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing the query: ', error);
            res.status(500).json({ error: 'Error loading messages' });
        } else {
            res.json(results); // Send the query results as response
        }
    });
});

app.post('/conversacion_id', (req, res) => {
    const usuarioPrincipal = req.body.usuarioPrincipal;
    const contactoUsername = req.body.contactoUsername;

    const query = `
        SELECT conversacion_id
        FROM participantes
        WHERE usuario_id IN (
            (SELECT id FROM usuarios WHERE nombre_usuario = '${usuarioPrincipal}'), 
            (SELECT id FROM usuarios WHERE nombre_usuario = '${contactoUsername}')
        )
        GROUP BY conversacion_id
        HAVING COUNT(DISTINCT usuario_id) = 2
        ORDER BY COUNT(DISTINCT usuario_id) DESC
        LIMIT 1;
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ error: 'Error loading conversation id' });
        } else {
            res.json(results); // Send the query results as response
        }
    });
});

// Method for registration
app.post('/register', async (req, res)=>{
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let passwordHash = await bcrypt.hash(password, 8);

    const query = `
        INSERT INTO usuarios (id, nombre_completo, nombre_usuario, correo_electronico, contrasena)
        VALUES (NULL, '${name}', '${username}', '${email}', '${passwordHash}')
    `;

    connection.query(query, async (error, results) => {
        if(error){
            console.log(error);
        }else{            
			res.render('register', {
				alert: true,
				alertTitle: "Registration",
				alertMessage: "¡Successful Registration!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
			});        
        }
	});
})



// Method for authentication
app.post('/auth', async (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;    
    let passwordHash = await bcrypt.hash(password, 8);

    const query = `
        SELECT * FROM usuarios WHERE nombre_usuario = '${username}'
    `;

    if (username && password) {
        connection.query(query, async (error, results, fields) => {
            if (results.length == 0 || !(await bcrypt.compare(password, results[0].contrasena)) ) {    
				res.render('index', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Incorrect username or password",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''    
                    });
			} else {          
				req.session.loggedin = true;                
                req.session.name = results[0].nombre_usuario;
				res.render('index', {
					alert: true,
					alertTitle: "Successful Connection",
					alertMessage: "Login Successful!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: 'chat'
				});        			
			}			
			res.end();
		});
	} 
});

app.post('/add_friend', (req, res) => {
    const usernamePrincipal = req.body.usernamePrincipal;
    const friendName = req.body.friendName;
    
    const query = `
      INSERT INTO contactos (usuario_id, contacto_usuario_id, es_grupo)
      VALUES (
        (SELECT id FROM usuarios WHERE nombre_usuario = '${usernamePrincipal}'),
        (SELECT id FROM usuarios WHERE nombre_usuario = '${friendName}'),
        0
      );
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error while inserting contact: ', error);
        } else {
            res.json({ friendName: friendName });
        }
    });
});

// Method to ensure that authentication is present on all pages
app.get('/chat', (req, res) => {
    if (req.session.loggedin) {
        // Render the 'chat' view
        res.render('chat', {
            login: true,
            name: req.session.name
        });
        
    } else {
        res.render('', {
            login: false,
        });
    }
    res.end();
});

// Function to clear the cache after logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//Logout
// Destroy the session.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // It will always execute after the session is destroyed
	})
});


server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
