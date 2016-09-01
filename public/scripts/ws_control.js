/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 21.07.16.
 */

function Container() {
    this.message = {
        content: ''
    };
    this.token = document.cookie;
}

var ws = new WebSocket('ws://localhost:8081');

function initSocket() {
    ws.onopen =function( event ) {
        console.log('connection opened');
    };
    ws.onmessage = function( event ) {
        appendMessage(event.data);
    };
    ws.onclose = function( event ) {
        console.log('connection closed');
    }
}

function initControl() {
    clearBoard();
    document.forms.publish.onsubmit = function( event ) {
        event.preventDefault();
        if (this.message.value) {
            var container = new Container();
            container.message = {
                content: this.message.value
            };
            var string = JSON.stringify(container);
            ws.send(string);
        }
    };
}

function clearBoard() {
    var output = document.getElementById('chat-main-window');
        output.innerHTML = '';
}

function appendMessage(container) {
    container = JSON.parse(container);
    var output = document.getElementById('chat-main-window');
    var message = document.createElement('p');
        message.style.wordWrap = 'break-word';
    if (container.user) {
        var item = document.createElement('span');
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