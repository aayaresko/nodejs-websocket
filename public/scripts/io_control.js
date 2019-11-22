/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 */

var matches = document.cookie.match(/\s?(token=[\.\-_0-9a-zA-z]+)/);
var token = '';

if (matches) {
    token = matches[1];
}

var socket = io.connect('http://localhost:8081', {
    'query': token
});


function Container() {
    this.clientId = socket.id;
    this.user = null;
    this.message = null;
}

function initSocket() {
    socket.on('chat message', function( data ) {
        appendMessage(data);
    });

    socket.on('notify others', function( data ) {
        appendMessage(data);
    });

    socket.on('unauthorized', function( error ) {
        if (error.data.type == 'UnauthorizedError' || error.data.code == 'invalid_token') {
            window.location = '/logout';
            console.log("User's token has expired");
        }
    });
}

function initControl() {
    clearBoard();

    document.forms.publish.onsubmit = function( event ) {
        event.preventDefault();

        let container = new Container();

        container.message = { content: this.message.value };

        if (container.message.content) {
            socket.emit('chat message', container);
        }
    };
}

function clearBoard() {
    let output = document.getElementById('chat-main-window');
        output.innerHTML = '';
}

function appendMessage(container) {
    let output = document.getElementById('chat-main-window'),
        message = document.createElement('p');

    message.style.wordWrap = 'break-word';

    if (container.user) {
        let item = document.createElement('span');
            item.innerHTML = container.user.nickname + ': ';

        message.appendChild(item);

        item = document.createElement('span');
        item.innerHTML = container.message.content;

        message.appendChild(item);
    } else {
        message.innerHTML = container.message.content;
    }

    output.appendChild(message);
    document.getElementById('message').value = null;
}

window.addEventListener('load', initControl, false);
window.addEventListener('load', initSocket, false);