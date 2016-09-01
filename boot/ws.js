/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 21.07.16.
 * WebSocket module.
 *
 * Implements basic WebSocket server.
 * Configures and initializes WebSocket module.
 * Notifies all users in chat room about connection of a new user.
 * Sends all user messages to all users in chat room.
 * Return configured and initialized WebSocket module.
 *
 * @see https://github.com/websockets/ws
 */
var jwt = require('jsonwebtoken');
var config = require('../config');

function Init( Server, Schema ) {
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({
        server: Server,
        protocolVersion: 13
    });
    var User = Schema.models.user;
    var container = {
        user: null,
        message: ''
    };
    wss.on('notify all except one', function( parent, client, string ) {
            parent.clients.forEach(function( recipient ) {
                if (recipient !== client) {
                    recipient.send(string);
                }
            });
        }
    );
    wss.on('connection', function( ws ) {
        function loadContent(token, done ) {
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
        ws.on('message', function( string ) {
            var data = JSON.parse(string);
            if (data.token) {
                var matches = data.token.match(/\s?(token=([\.\-_0-9a-zA-z]+))/);
                var token = matches[2];
                if (token) {
                    var item = jwt.verify(token, config.global.secret);
                    loadContent(item, function( error ) {
                        if (!error) {
                            var user = container.user;
                            var message = user.message.build(data.message);
                                message.save();
                            // we don't need a message id so we use async save
                            container.message = message;
                            var newString = JSON.stringify(container);
                            wss.broadcast(newString);
                        }
                    });
                }
            }
            wss.emit('notify all except one', wss, ws, JSON.stringify({ content: 'Say hello to a new user'}));
        });
    });
    wss.broadcast = function( data ) {
        wss.clients.forEach(function( client ) {
            client.send(data);
        })
    };
    return wss;
}

module.exports = Init;