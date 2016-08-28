/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 21.07.16.
 */
function Container() {
    this.content = null;
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
        var container = new Container();
        container.content = this.message.value;
        if (container.content) {
            var string = JSON.stringify(container);
            ws.send(string);
        }
    };
}

function clearBoard() {
    var output = document.getElementById('chat-main-window');
    output.innerHTML = '';
}

function appendMessage(string) {
    var container = JSON.parse(string);
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