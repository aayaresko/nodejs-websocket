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

var config = require('../config');
var socketioJwt = require('socketio-jwt');

function Init( Server, Schema ) {
    var Socket = require('socket.io');
    var io = new Socket(Server, {});
    var User = Schema.models.user;
    var container = {
        user: null,
        message: ''
    };
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
        client.on('disconnect', function() {
            console.log('user disconnected!');
        });
        function loadContent( done ) {
            User.findById(token.id, function( error, model ) {
                if (error) {
                    done(error);
                }
                if (!model) {
                    done(new Error('not found'));
                }
                if (model) {
                    container.user = model;
                    done();
                }
            });
        }
        loadContent(function( error ) {
            if (!error) {
                container.message = { content: 'has joined to the chat' };
                client.broadcast.emit('notify others', container);
            }
        });
        // Since there is no possibility to send message when user model is not defined
        // we will attach 'chat message' event listener only after that model have been defined
        client.on('chat message', function( data ) {
            var user = container.user;
            var message = user.message.build(data.message);
                message.save();
            // we don't need a message id so we use async save
            container.message = message;
            // send message to all users
            io.emit('chat message', container);
        });
    });
    return io;
}

module.exports = Init;