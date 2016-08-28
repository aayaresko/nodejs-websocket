# NodeJs-WebSocket
Basic NodeJs application with WebSocket live-chat

# Overview
This is my first NodeJs application. It is an example implementation of NodeJs + WebSocket stack. It consist of a simple Web-server and WebSocket-server. This example contains a basic WebSocket-server and Socket.io WebSocket-server.
To use Socket.io implementation follow the steps below.
Edit the 'www' file: 
```javascript
//var wss = require('../boot/ws')(server);
var socket = require('../boot/io')(server);
```
Edit the 'chat.twig' file: 
```html
{#<script type="text/javascript" src="/assets/scripts/ws_control.js"></script>#}
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script type="text/javascript" src="/assets/scripts/io_control.js"></script>
```

# Running an application
To run an application simply execute './bin/www' in your console.

# Requirements
* NodeJs 
* Npm 
* MongoDB
* Redis
