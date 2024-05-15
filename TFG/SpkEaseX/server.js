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

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'steven',
    password: 'steven',
    database: 'spkeasex'
});


// Cuando un cliente se conecta al socket
io.on('connection', async (socket) => {
    console.log('a user has connected!')


    const username = socket.handshake.auth.username ?? 'anonymous'

    // Manejar evento para unirse a una sala
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        // Emitir evento de unión a sala a todos los clientes en la sala
        io.to(roomId).emit('user_joined_room', { username, roomId });
        console.log(`${username} se ha unido a la sala ${roomId}`);
        
    });

    // Manejar evento para salir de una sala
    socket.on('leaveRoom', ({ roomId }) => {
        socket.leave(roomId);
        console.log(`${username} salió de la sala ${roomId}`);
    });

    
    socket.on('mensaje', ({ mensaje, roomId, horaActual, conversacionId, file, fileName, fileType }) => {
    let result;
    try {
        result = `INSERT INTO mensajes (id, contenido, fecha_envio, remitente_id, conversacion_id)
                  VALUES (NULL, '${mensaje}', '${horaActual}', 
                          (SELECT id FROM usuarios WHERE nombre_usuario = '${username}'), 
                          '${conversacionId}')`;

        // Ejecutar la consulta SQL
        connection.query(result, (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
            }
        });
    } catch (e) {
        console.error(e);
        return;
    }

    const messageData = { mensaje, username, horaActual, file, fileName, fileType };
    io.to(roomId).emit('chat message', messageData);
    console.log(`Mensaje enviado a la sala ${roomId}: ${mensaje}`);
});
    
    // Escuchar evento para iniciar una llamada en una sala específica
    socket.on('startCall', (roomName, contactoUsername) => {
        // Unirse a la sala especificada
        socket.join(roomName);
        console.log(`Usuario ${username} inició una llamada en la sala ${roomName}`);

        // Emitir evento a todos los clientes en la sala para notificar la llamada
        io.to(roomName).emit('callStarted', username, contactoUsername);
    });
    
    socket.on('startVideoCall', (roomName, contactoUsername) => {
        // Unirse a la sala especificada
        socket.join(roomName);
        console.log(`Usuario ${username} inició una llamada en la sala ${roomName}`);

        // Emitir evento a todos los clientes en la sala para notificar la llamada
        io.to(roomName).emit('videocallStarted', username, contactoUsername);
    });
    
    socket.on('audioStream', (data) => {
        const { stream, roomId } = data;
        socket.join(roomId);
        // Reenviar el stream de audio a todos los clientes en la misma room excepto al cliente que lo envió
        io.to(roomId).emit('audioReceived', stream, username);
    });
    
    // Reenviar los datos recibidos a todos los clientes conectados
        socket.on('mediaStream', (data) => {
            const { data: mediaData, roomId, username } = data;
        socket.to(roomId).emit('mediaStreamReceived', mediaData, username);
    });

    
    socket.on('hangup', (roomId) => {
        // Reenviar el stream de audio a todos los clientes en la misma room excepto al cliente que lo envió
        io.to(roomId).emit('callFinished', username);
    });
    
    // Manejar evento de desconexión del usuario
    socket.on('disconnect', () => {
        console.log(`${username} se ha desconectado del chat`);

        // Emitir evento de desconexión de usuario a todos los clientes conectados
        io.emit('user_disconnected', username);
    });
    
   

});


//5 - Establecemos el motor de plantillas
app.set('view engine', 'ejs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Middleware para analizar los cuerpos de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/register', (req, res) => {
    res.render('register');
});


// Ruta para obtener los contactos del usuario con id 1
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
            console.error('Error al obtener los contactos:', error.message);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(results);
    });
});


app.post('/mensajes', (req, res) => {
    const usuarioPrincipal = req.body.usuarioPrincipal;
    const contactoUsername = req.body.contactoUsername;

    // Consulta SQL
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
    // Ejecutar la consulta SQL
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al cargar los mensajes' });
        } else {
            res.json(results); // Enviar los resultados de la consulta como respuesta
        }
    });
});

app.post('/conversacion_id', (req, res) => {
    const usuarioPrincipal = req.body.usuarioPrincipal;
    const contactoUsername = req.body.contactoUsername;

    // Consulta SQL
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
    // Ejecutar la consulta SQL
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al cargar los mensajes' });
        } else {
            res.json(results); // Enviar los resultados de la consulta como respuesta
        }
    });
});

//Método para la REGISTRACIÓN
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



//Metodo para la autenticacion
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
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
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
					alertTitle: "Conexión exitosa",
					alertMessage: "¡LOGIN CORRECTO!",
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
    
    // Aquí puedes realizar la lógica para agregar el amigo en tu base de datos o donde corresponda
    const query = `
      INSERT INTO contactos (usuario_id, contacto_usuario_id, es_grupo)
      VALUES (
        (SELECT id FROM usuarios WHERE nombre_usuario = '${usernamePrincipal}'),
        (SELECT id FROM usuarios WHERE nombre_usuario = '${friendName}'),
        0
      );
    `;
    // Ejecutar la consulta SQL
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al insertar contacto:', error);
        } else {
            res.json({ friendName: friendName });
        }
    });
});

//Método para controlar que está auth en todas las páginas
app.get('/chat', (req, res) => {
    if (req.session.loggedin) {
        // Renderiza la vista 'chat'
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

//función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

 //Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});


server.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto: ${PORT}`);
});
