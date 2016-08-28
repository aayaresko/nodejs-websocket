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
function Init( server ) {
    var Socket = require('socket.io');
    var io = new Socket(server, {});
    var MessageModel = require('../entities/schemas/message');
    var config = require('../config');
    var socketioJwt = require('socketio-jwt');

    io.use(socketioJwt.authorize({
            secret: config.global.secret,
            timeout: 15000, // 15 seconds to send the authentication message
            handshake: true, // validate token on handshake
            callback: false // No client-side callback, terminate connection server-side
        })
    );
    io.on('connection', function( client ) {
        var token = client.decoded_token;
        console.log('user connected!');
        client.on('chat message', function( data ) {
            var message = MessageModel(data);
                message.userId = token.id;
                message.save();
            var container = data;
                container.nickname = token.nickname;
                container.firstName = token.firstName;
                container.lastName = token.lastName;
            // send message to all users
            io.emit('chat message', container);
        });
        client.on('disconnect', function() {
            console.log('user disconnected!');
        });
        var container = {
            nickname: token.nickname,
            firstName: token.firstName,
            lastName: token.lastName,
            content: 'Say hello to a new user'
        };
        // send message to all except the current user
        client.broadcast.emit('notify others', container);
    });

    return io;
}

module.exports = Init;