/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 18.07.16.
 * WebSocket module.
 *
 * Implements extended, more flexible WebSocket server.
 * Configures and initializes WebSocket module.
 * Notifies all users in chat room about connection of a new user.
 * Sends all user messages to all users in chat room.
 * Uses JWT authorization mechanism.
 * Return configured and initialized WebSocket module.
 *
 * @see http://socket.io/
 */

let config = require('../config');
let socketioJwt = require('socketio-jwt');

function handleUserDisconnectedEvent(clientId, users) {
    let message = 'unknown user disconnected!';

    if (users[clientId]) {
        let user = users[clientId];
            message = `user ${user.email} disconnected`;

        delete users[clientId];
    }

    console.log(message);
}

function Container() {
    this.clientId = null;
    this.user = null;
    this.message = null;
}

function Init( Server, Schema ) {
    let Socket = require('socket.io'),
        io = new Socket(Server, {}),
        User = Schema.models.user,
        users = {};

    io.use(socketioJwt.authorize(
        {
            secret: config.global.secret,
            timeout: 15000, // 15 seconds to send the authentication message
            handshake: true, // validate token on handshake
            callback: false // No client-side callback, terminate connection server-side
        })
    );

    io.on('connection', function( client ) {
        let token = client.decoded_token;

        console.log('user connected!');

        User.findById(token.id, function (error, model) {
            if (error || !model) {
                return null;
            }

            if (model) {
                let container = new Container();

                users[client.id] = model;
                container.user = model;
                container.message = { content: 'has joined to the chat' };

                client.broadcast.emit('notify others', container);

                client.on('disconnect', function() {
                    handleUserDisconnectedEvent(client.id, users);
                });
            }
        });

        // Since there is no possibility to send message when user model is not defined
        // we will attach 'chat message' event listener only after that model have been defined
        client.on('chat message', function (data) {
            let container = new Container(),
                user = users[data.clientId],
                message = user.message.build(data.message);

            message.save();

            container.user = user;
            container.message = message;

            io.emit('chat message', container);
        });
    });

    return io;
}

module.exports = Init;