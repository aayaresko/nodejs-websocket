/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 */

function Container() {
    this.content = null;
}

var matches = document.cookie.match(/\s?(token=[\.0-9a-zA-z]+)/);
var token = '';

if (matches) {
    token = matches[2];
}

var socket = io.connect('http://localhost:8081', {
    'query': token
});

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
        var container = new Container();
            container.content = this.message.value;
        if (container.content) {
            socket.emit('chat message', container);
        }
    };
}

function clearBoard() {
    var output = document.getElementById('chat-main-window');
        output.innerHTML = '';
}

function appendMessage(container) {
    var output = document.getElementById('chat-main-window');
    var message = document.createElement('p');
        message.style.wordWrap = 'break-word';
    if (container.nickname) {
        var item = document.createElement('span');
            item.innerHTML = container.nickname + ': ';
        message.appendChild(item);
            item = document.createElement('span');
            item.innerHTML = container.content;
        message.appendChild(item);
    } else {
        message.innerHTML = container.content;
    }
    output.appendChild(message);
    document.getElementById('message').value = null;
}

window.addEventListener('load', initControl, false);
window.addEventListener('load', initSocket, false);
