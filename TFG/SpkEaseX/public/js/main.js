document.addEventListener('DOMContentLoaded', () => {
const usernamePrincipal = document.querySelector('.user-selected .username').textContent;

const userElement = document.querySelector('.user-selected .user');
const contextMenu = document.getElementById('contextMenu');
const logoutOption = document.getElementById('logoutOption');

// Show context menu when left-clicking on the username
userElement.addEventListener('click', (event) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
});

// Hide context menu when clicking anywhere on the document
document.addEventListener('click', (event) => {
    if (event.target !== userElement && event.target !== logoutOption) {
        contextMenu.style.display = 'none';
    }
});

logoutOption.addEventListener('click', () => {
    // Perform logout action
    window.location.href = '/logout'; 
});

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.querySelector('.message-box')
let conversacionId = null; 

const socket = io({
                  auth: {
                    username: usernamePrincipal
                  }
                });

// Listen for the 'connect' event
socket.on('connect', () => {
    console.log('Connection established with the server');
});

// Get the list of users
const userList = document.querySelector('.user-list');

// Variable to store the name of the previous room
let salaAnterior = '';
let roomName = '';
let contactoUsername = '';

// Attach click event to each element of the user list
userList.addEventListener('click', event => {
    if (event.target.classList.contains('user')) {
        // Show the call bar and message input area
        document.querySelector('.call-bar').style.display = 'block';
        document.querySelector('.message-input').style.display = 'flex';

        contactoUsername = event.target.querySelector('.username').textContent;

        const users = [usernamePrincipal, contactoUsername]; // Update the list of users

        // Sort the names alphabetically
        const sortedUsernames = users.sort();

        // Create the room name by concatenating the sorted names
        roomName = sortedUsernames.join('&');

        cargarMensajes(usernamePrincipal, contactoUsername);

        conversacion_id(usernamePrincipal, contactoUsername);

        // Leave the previous room before joining the new room
        if (salaAnterior !== '') {
            socket.emit('leaveRoom', { roomId: salaAnterior });
        }

        setTimeout(() => {
            // Join a specific room
            socket.emit('joinRoom', { roomId: roomName });

            // Update the name of the previous room
            salaAnterior = roomName; 
            console.log(roomName);
        }, 1000);
    }
});

//                    
socket.on('chat message', ({ mensaje, username, horaActual, file, fileName, fileType }) => {
    let messageClass = 'user1'; // By default, assign the 'user1' class (or desired style) to the message
    const separators = document.querySelectorAll('.separator');

    // Check if the message comes from the main user
    if (username === usernamePrincipal) {
        messageClass = 'user1'; // Assign the 'user1' class for user 1 messages
    } else {
        messageClass = 'user2'; // Assign the 'user2' class for messages from other users
    }

    const fechaEnvio = new Date(horaActual);
    const dia = fechaEnvio.getDate();
    const numeroMes = fechaEnvio.getMonth();
    const año = fechaEnvio.getFullYear();

    // Format the date as a readable string
    const fechaFormateada = `${dia} of ${nombresMeses[numeroMes]} of ${año}`;

    // Iterate over each element and read its content
    let fechaPresente = false;
    separators.forEach(separator => {
        if (separator.textContent === fechaFormateada) {
            fechaPresente = true;
        }
    });

    // If the date is not present, add it to the list of separators
    if (!fechaPresente) {
        const divSeparador = `<br><p class="separator">${fechaFormateada}</p><br>`;
        messages.insertAdjacentHTML('beforeend', divSeparador);
    }                              

    // Get the time components
    const horas = (fechaEnvio.getHours() + 2).toString().padStart(2, '0');  // Get hours in two-digit format
    const minutos = fechaEnvio.getMinutes().toString().padStart(2, '0'); // Get minutes in two-digit format
    const segundos = fechaEnvio.getSeconds().toString().padStart(2, '0'); // Get seconds in two-digit format

    // Format the time as HH:mm:ss
    const horaFormateada = `${horas}:${minutos}:${segundos}`; 

    // Construct the message element with the corresponding class
    const item = `
        <div class="message ${messageClass}">
            <h4 class="content">
                <p class="mensaje">${mensaje}</p>
                <br><p class="timestamp">${horaFormateada}</p>
            </h4>
        </div>
    `;

    messages.insertAdjacentHTML('beforeend', item);

    if (file) {
        const fileLink = document.createElement('a');
        fileLink.href = file;
        fileLink.download = fileName;
        fileLink.textContent = `${fileName}`;
        fileLink.className = 'file-download';

        const messageElement = document.querySelector(`.message.${messageClass}:last-child .content`);

         // Insert the file link before the timestamp
        const timestampElement = messageElement.querySelector('.timestamp');
        messageElement.insertBefore(document.createElement('br'), timestampElement);
        messageElement.insertBefore(fileLink, timestampElement);
    }

    messages.scrollTop = messages.scrollHeight;
});

// When clicking the call button
document.querySelector('.call-button').addEventListener('click', () => {
   if(roomName != ''){
        socket.emit('startCall', roomName, contactoUsername); // Emit event to start the call in the room
    }
});

// When clicking the video call button
document.querySelector('.video-call-button').addEventListener('click', () => {
   if(roomName != ''){
        socket.emit('startVideoCall', roomName, contactoUsername); // Emit event to start the video call in the room
    }
});

socket.on('callStarted', (username, contactoUsername) => {
    const callBar = document.querySelector('.call-bar');
    callBar.style.padding = '30px'; // Increase padding to make it more visible
    callBar.style.textAlign = 'center'; // Align text in the center
    callBar.style.display = "inline-table";

    // Show avatars and names of participants in the center of the call bar
    const participantsContainer = document.createElement('div');
    // Add avatars and names of participants
    const participant1 = createParticipantElement(username); 
    const participant2 = createParticipantElement(contactoUsername);

    // Add hang up, mute, and deafen buttons below the avatars and names                        
    const muteButton = createMuteButton();
    const hangupButton = createHangupButton();       

    // Clear current content of call bar and add participants container
    callBar.innerHTML = '';
    callBar.appendChild(participantsContainer);
    callBar.appendChild(participant1);
    callBar.appendChild(participant2);
    callBar.appendChild(hangupButton); 
    callBar.appendChild(muteButton);

    startAudioCapture(); 
});

// Event handler for 'callFinished' event
socket.on('callFinished', (username) => {
    console.log("Hung up on " + username);

    stopVideoCapture();
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
    }

    const localVideo = document.getElementById('localVideo');
    if (localVideo && localVideo.srcObject) {
        const tracks = localVideo.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        localVideo.srcObject = null;
    }

    // Display the call bar more prominently
    const callBar = document.querySelector('.call-bar');
    if (callBar) {
        // Apply styles to the container
        callBar.style.backgroundColor = '#36393f';
        callBar.style.padding = '15px';
        callBar.style.height = '50px';
        callBar.style.textAlign = 'right';
        callBar.style.display = 'flow';
        callBar.style.alignItems = 'center';
        // Clear the existing content and add the new HTML
        callBar.innerHTML = `
            <button class="call-button"><i class="fa-solid fa-phone-volume"></i></button>
            <button class="video-call-button"><i class="fa-solid fa-video"></i></button>
        `;

         // When clicking the call button
        document.querySelector('.call-button').addEventListener('click', () => {
           if(roomName != ''){
                socket.emit('startCall', roomName, contactoUsername); // Emit event to start the call in the room
            }
        });

        // When clicking the call button
        document.querySelector('.video-call-button').addEventListener('click', () => {
           if(roomName != ''){
                socket.emit('startVideoCall', roomName, contactoUsername); // Emit event to initiate the call in the room
            }
        });
    } else {
        console.error('The .call-bar container was not found in the DOM');
    }
});

socket.on('videocallStarted', (username) => {
    console.log("Started video call from " + username);
    // Increase the size of the call bar and center it
    const callBar = document.querySelector('.call-bar');
    if (callBar) {
        callBar.style.backgroundColor = '#36393f';
        callBar.style.height = '500px';
        callBar.style.textAlign = 'center'; // Center the content
        callBar.style.display = 'flex'; // Use flexbox to vertically center
        callBar.style.alignItems = 'center';
        callBar.style.justifyContent = 'flex-end'; // Uniform space between child elements                            
        callBar.style.flexDirection = 'column'; // Vertically align elements

        // Clear the existing content and add new HTML for the video call
        callBar.innerHTML = `
            <div class="video-container">
                <video id="localVideo" autoplay muted style="transform: scaleX(-1);"></video>
                <canvas id="remoteVideo"></canvas>
                <img id="play" src="" style="display:none;" alt="">
            </div>
            <div class="call-buttons">

            </div>
        `;
        const callButtons = document.querySelector('.call-buttons');
        const muteButton = createMuteButton();
        const hangupButton = createHangupButton();     
        callButtons.appendChild(hangupButton); 
        callButtons.appendChild(muteButton);
        // Start capturing audio and video from the local user
        startMediaStream();
    }
});

// Global variables
let audioContext = null, analyser, audioSource, audioStream, isSpeaking = false, isMuted = false;
let recorder, stream, recordervideo, imageCaptureInterval;

// Function to start local video streaming
async function startMediaStream() {
    try {
        const constraints = { video: true, audio: true };
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (!stream) {
            console.error('Failed to capture media stream');
            return;
        }

        const localVideo = document.getElementById('localVideo');
        if (!localVideo) {
            console.error('The local video element was not found');
            return;
        }
        localVideo.srcObject = stream;

        // Start audio capture
        startAudioCapture(stream);

        // Start the interval to capture and send video frames
        imageCaptureInterval = setInterval(() => {
            const videoTrack = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(videoTrack);

            imageCapture.grabFrame().then((bitmap) => {
                const canvas = document.createElement('canvas');
                canvas.width = bitmap.width;
                canvas.height = bitmap.height;
                canvas.style.display = 'none';
                canvas.getContext('2d').drawImage(bitmap, 0, 0);
                socket.emit('mediaStream', { data: canvas.toDataURL('image/webp'), roomId: roomName, contactoUsername: contactoUsername });
            }).catch(error => console.error('Error capturing video frame:', error));
        }, 300);
    } catch (error) {
        console.error('Error starting media stream:', error);
    }
}


// Handle the reception of the media stream
socket.on('mediaStreamReceived', (data, contactoUsername) => {
       playReceivedMedia(data);
});

// Function to play the mediaStream received from another user
function playReceivedMedia(mediaData) {
    if (!mediaData) {
        return;
    }

    const canvas = document.getElementById('remoteVideo');
    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }

    context.width = canvas.width;
    context.height = canvas.height;

    const img = new Image();
    img.src = mediaData;
    img.onload = () => {
        context.drawImage(img, 0, 0, context.width, context.height);
    };
}


// Function to start audio capture
function startAudioCapture() {
    if (!audioContext) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                audioContext = new AudioContext();
                audioSource = audioContext.createMediaStreamSource(stream);
                audioStream = stream; // Save the stream for recording
                analyser = audioContext.createAnalyser();
                audioSource.connect(analyser);
                startAudioStream();
            })
            .catch(err => console.error('Error capturing audio from the microphone:', err));
    } else {
        startAudioStream();
    }
}

// Function to start audio streaming when audio activity is detected
function startAudioStream() {
    const audioThreshold = 40; // Adjust as needed.

    sendAudioInterval = setInterval(() => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        const audioLevel = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

        if (audioLevel > audioThreshold && !isMuted) {
            if (!isSpeaking) {
                isSpeaking = true;
                addBorderToAvatar();
                startRecording();
            }
        } else {
            if (isSpeaking) {
                isSpeaking = false;
                removeBorderFromAvatar();
                stopRecording();
            }
        }
    }, 50);
}

// Function to start audio recording
function startRecording() {
    let chunks = []; // Clear the chunks for a new recording
    mediaRecorder = new MediaRecorder(audioStream);

    mediaRecorder.ondataavailable = event => {
        const reader = new FileReader();
        reader.onload = () => {
            const audioData = reader.result;
            socket.emit('audioStream', { stream: audioData, roomId: roomName });
        };
        reader.readAsArrayBuffer(event.data);
    };

    mediaRecorder.start();
}

// Function to stop audio recording
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
}
function stopVideoCapture() {
    if (stream) {
        const videoTracks = stream.getVideoTracks();
        videoTracks.forEach(track => track.stop());
    }
     clearInterval(imageCaptureInterval);
     imageCaptureInterval = null;
}
// Function to add border to the avatar
function addBorderToAvatar() {
    const separators = document.querySelectorAll('.name');
    separators.forEach(separator => {
        if (separator.textContent === usernamePrincipal) {
            const participantContainer = separator.closest('.participant');
            const avatar = participantContainer.querySelector('.avatar2');
            if (avatar) {
                // Add border to the avatar
                avatar.style.border = '3px solid green';
            }
        }
    });
}

// Function to remove border from the avatar
function removeBorderFromAvatar() {
    const separators = document.querySelectorAll('.name');
    separators.forEach(separator => {
        if (separator.textContent === usernamePrincipal) {
            const participantContainer = separator.closest('.participant');
            const avatar = participantContainer.querySelector('.avatar2');
            if (avatar) {
                // Remove border from the avatar
                avatar.style.border = '';
            }
        }
    });
}

// Function to add border to the avatar
function addBorderToConctact() {
    const separators = document.querySelectorAll('.name');
    separators.forEach(separator => {
        if (separator.textContent === contactoUsername) {
            const participantContainer = separator.closest('.participant');
            const avatar = participantContainer.querySelector('.avatar2');
            if (avatar) {
                // Add border to the avatar
                avatar.style.border = '3px solid green';
            }
        }
    });
}

// Function to remove border from the avatar
function removeBorderFromConctact() {
    const separators = document.querySelectorAll('.name');
    console.log(contactoUsername);
    separators.forEach(separator => {
        if (separator.textContent === contactoUsername) {
            const participantContainer = separator.closest('.participant');
            const avatar = participantContainer.querySelector('.avatar2');
            if (avatar) {
                // Remove border from the avatar
                avatar.style.border = '';
            }
        }
    });
}


// Listen for the 'audioReceived' event from the server
socket.on('audioReceived', (stream, username) => {

    // Play the received audio only if it was not sent by the current user
    if (username !== usernamePrincipal) {
        // Add a 2-second delay before playing the audio
        setTimeout(() => {
            playReceivedAudio(stream);
            removeBorderFromConctact();
        }, 2000);
    }
});

// Function to play the received audio
function playReceivedAudio(audioData) {
    const audioBlob = new Blob([audioData], { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio();

    const reader = new FileReader();
    reader.onload = function() {
        audio.src = reader.result;

        // Add event to add green border when playback starts
        audio.addEventListener('play', function() {
            addBorderToConctact();
        });

        // Add event to remove green border when playback ends
        audio.addEventListener('ended', function() {
            removeBorderFromConctact();
        });

        // Add events to handle playback errors
        audio.onerror = function(event) {
            console.error('Error playing the audio:', event);
            console.error('Audio URL:', audioUrl);
            removeBorderFromConctact(); // Make sure to remove the border in case of an error
        };

        // Play the audio
        audio.play().catch(error => {
            console.error('Error trying to play the audio:', error);
            removeBorderFromConctact(); // Make sure to remove the border in case of an error
        });
    };
    reader.readAsDataURL(audioBlob);
}

// Function to create a participant element with avatar and name
function createParticipantElement(name) {
    const participant = document.createElement('div');
    participant.classList.add('participant');

    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar2');
    avatarDiv.textContent = name.charAt(0);
    participant.appendChild(avatarDiv);      

    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('name');
    usernameSpan.textContent = name;
    participant.appendChild(usernameSpan);

    return participant;
}

// Functions to create hang up, mute, and deafen buttons
function createHangupButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-phone-slash"></i>';
    button.classList.add('hangup-button');
    button.addEventListener('click', () => {
        socket.emit('hangup', roomName)
    });
    return button;
}

function createMuteButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
    button.classList.add('mute-button');
    button.addEventListener('click', () => {
        // Toggle the state of isMuted
        isMuted = !isMuted;

        if (isMuted) {
            console.log("Muted");
            // Remove the border from the avatar
            removeBorderFromAvatar();
        } else {
            console.log("Unmuted");
            // Start audio capture
            startAudioCapture();
        }
    });
    return button;
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    sendFilesAndMessages();
});

document.getElementById('send-button').addEventListener('click', (e) => {
    e.preventDefault();
    sendFilesAndMessages();
});

document.getElementById('file-input').addEventListener('change', function() {
    const file = this.files[0];
    const filePreview = document.getElementById('file-preview');
    const fileIcon = document.getElementById('file-icon');
    const fileName = document.getElementById('file-name');

    if (file) {
        filePreview.style.display = 'inline-flex';
        fileName.textContent = file.name;

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const iconMapping = {
            'pdf': 'pdf.png',
            'rar': 'rar.png',
            'jpg': 'jpg.png',
            'jpeg': 'jpg.png',
            'png': 'png.png'
        };

        fileIcon.src = iconMapping[fileExtension] ? 'imagenes/' + iconMapping[fileExtension] : 'imagenes/default.png';
    } else {
        filePreview.style.display = 'none';
    }
});

function sendFilesAndMessages() {
    const mensaje = document.getElementById('input').value;
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const now = new Date();

    const fechaHoraMySQL = now.toISOString().slice(0, 19).replace('T', ' ');

    if (roomName !== '') {
        if (mensaje.trim() !== '' || file) {
            const data = {
                mensaje: mensaje.trim(),
                roomId: roomName,
                horaActual: fechaHoraMySQL,
                conversacionId: conversacionId
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    data.file = e.target.result;
                    data.fileName = file.name;
                    data.fileType = file.type;
                    socket.emit('mensaje', data);
                    limpiarInputs();
                };
                reader.readAsDataURL(file);
            } else {
                socket.emit('mensaje', data);
                limpiarInputs();
            }
        }
    }
}

function limpiarInputs() {
    document.getElementById('input').value = "";
    document.getElementById('file-input').value = "";
    document.getElementById('file-preview').style.display = 'none';
}

const addFriendButton = document.querySelector('.add-friend-button');

addFriendButton.addEventListener('click', () => {
// Show the modal dialog box
Swal.fire({
    title: 'Add Friend',
    html: '<input id="friend-name" class="swal2-input" placeholder="Friend name">',
    showCancelButton: true,
    confirmButtonText: 'Send',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => {
        // Get the value of the input field
        const friendName = document.getElementById('friend-name').value;
        console.log(friendName);
        // Send the request to add the friend
        return fetch('/add_friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
             body: JSON.stringify({
                usernamePrincipal: usernamePrincipal,
                friendName: friendName
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding friend');
            }
            return response.json();
        })
        .then(data => {
            // Handle the server response after adding the friend
            Swal.fire({
                title: 'Friend added',
                text: `You have added ${data.friendName} as a friend`,
                icon: 'success'
            })
            .then(()=>{
                window.location='/chat'
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error'
                });
            });
        }
    });
});

 function conversacion_id(usuarioPrincipal, contactoUsername) {
    // Make a fetch request to the server and return a promise
    return fetch('/conversacion_id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuarioPrincipal: usuarioPrincipal,
            contactoUsername: contactoUsername
        })
    })
   .then(response => {
    if (!response.ok) {
        throw new Error('Error loading conversation ID');
    }
    return response.json();
})                        
.then(data => {
    // Add each message to the message container in reverse order
    for (let i = data.length - 1; i >= 0; i--) {
        const res = data[i];
        conversacionId = res.conversacion_id;
    }
    return conversacionId; // Return the conversation ID
})
.catch(error => console.error('Error loading conversation ID:', error));
}

function cargarMensajes(usuarioPrincipal, contactoUsername) {
fetch('/mensajes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        usuarioPrincipal: usuarioPrincipal,
        contactoUsername: contactoUsername
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error loading messages');
    }
    return response.json();
})
.then(data => {
    const messageBox = document.querySelector('.message-box');
    messageBox.innerHTML = ''; // Clear the message container

    let fechaAnterior = null; // Variable to store the date of the previous message

    for (let i = data.length - 1; i >= 0; i--) {
        const mensaje = data[i];
        const fechaEnvio = new Date(mensaje.fecha_envio);
        const dia = fechaEnvio.getDate();
        const numeroMes = fechaEnvio.getMonth();
        const año = fechaEnvio.getFullYear();

        const fechaFormateada = `${dia} of ${nombresMeses[numeroMes]} of ${año}`;

        if (fechaAnterior !== fechaFormateada) {
            const divSeparador = document.createElement('div');
            divSeparador.innerHTML = `<br><p class="separator">${fechaFormateada}</p><br>`;
            messageBox.appendChild(divSeparador);
            fechaAnterior = fechaFormateada;
        }

        const horas = (fechaEnvio.getHours() + 2).toString().padStart(2, '0'); 
        const minutos = fechaEnvio.getMinutes().toString().padStart(2, '0');
        const segundos = fechaEnvio.getSeconds().toString().padStart(2, '0');
        const horaFormateada = `${horas}:${minutos}:${segundos}`;

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('message');
        divMensaje.classList.add(mensaje.nombre_usuario === usuarioPrincipal ? 'user1' : 'user2');

        const contenido = document.createElement('h4');
        contenido.classList.add('content');

        const textoMensaje = document.createElement('p');
        textoMensaje.classList.add('mensaje');
        textoMensaje.innerHTML = mensaje.contenido;
        contenido.appendChild(textoMensaje);

        if (mensaje.file) {
            const fileLink = document.createElement('a');
            fileLink.href = mensaje.file;
            fileLink.download = mensaje.fileName;
            fileLink.textContent = `${mensaje.fileName}`;
            fileLink.className = 'file-download';
            contenido.appendChild(fileLink);
        }
        const br = document.createElement('br');
        contenido.appendChild(br);

        const timestamp = document.createElement('p');
        timestamp.classList.add('timestamp');
        timestamp.textContent = horaFormateada;
        contenido.appendChild(timestamp);

        divMensaje.appendChild(contenido);
        messageBox.appendChild(divMensaje);
    }

    messageBox.scrollTop = messageBox.scrollHeight;
})
.catch(error => console.error('Error loading messages:', error));
}

// Array of month names
const nombresMeses = [
'January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'
];

fetch('/contactos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        usuario : usernamePrincipal
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error loading contacts');
    }
    return response.json();
})                        
.then(data => {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear the user list before adding the new ones

    data.forEach(contacto => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        // Create avatar container
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar');
        userDiv.appendChild(avatarDiv);

        const usernameSpan = document.createElement('span');
        usernameSpan.classList.add('username');
        usernameSpan.textContent = contacto.nombre_usuario;
        userDiv.appendChild(usernameSpan);

        userList.appendChild(userDiv);
    });
     // Get the message box element
    const messageBox = document.querySelector('.message-box');

    // Scroll the message box to the bottom
    messageBox.scrollTop = messageBox.scrollHeight;
    document.querySelectorAll('.user').forEach(user => {
        const username = user.querySelector('.username').textContent;
        const firstLetter = username.charAt(0);
        user.querySelector('.avatar').textContent = firstLetter;
    });
})
.catch(error => console.error('Error loading contacts:', error));
});