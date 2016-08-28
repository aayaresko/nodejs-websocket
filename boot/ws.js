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

function Init( server ) {
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({
        server: server,
        protocolVersion: 13
    });
    var MessageModel = require('../entities/schemas/message');

    wss.on('notify all except one', function( parent, client, string ) {
            parent.clients.forEach(function( recipient ) {
                if (recipient !== client) {
                    recipient.send(string);
                }
            });
        }
    );

    wss.on('connection', function( ws ) {
        ws.on('message', function( string ) {
            var data = JSON.parse(string);
            if (data.token) {
                var matches = data.token.match(/token=(.+)/);
                var token = matches[1];
                if (token) {
                    var user = jwt.verify(token, config.global.secret);
                    var message = MessageModel(data);
                        message.userId = user.id;
                        message.save();
                    var container = data;
                        container.nickname = user.nickname;
                        container.firstName = user.firstName;
                        container.lastName = user.lastName;
                        delete data.token;
                    var newString = JSON.stringify(container);
                    wss.broadcast(newString);
                }
            }
        });
        wss.emit('notify all except one', wss, ws, JSON.stringify({ content: 'Say hello to a new user'}));
    });
    wss.broadcast = function( data ) {
        wss.clients.forEach(function( client ) {
            client.send(data);
        })
    };

    return wss;
}

module.exports = Init;