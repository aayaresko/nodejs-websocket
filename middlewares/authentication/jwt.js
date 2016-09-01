/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 22.07.16.
 * JWT middleware.
 *
 * Creates a JWT token which contain some user data, and store it in user cookie.
 * This token will be use to access user data on the server in WebSocket live chat.
 * Runs the failure callback if [[options.failureRedirect]] are specified
 * Runs the success callback if [[options.successRedirect]] are specified.
 * In other cases it will call next middleware.
 *
 */
var jwt = require('jsonwebtoken');
var config = require('../../config');

function Authenticate( options ) {
    return function( request, response, next ) {
        if (request.user) {
            var token = jwt.sign(JSON.stringify({ id: request.user.id }), config.global.secret);
            response.cookie('token', token);
            if (options.successRedirect) {
                response.redirect(options.successRedirect);
            } else {
                next();
            }
        } else {
            if (options.failureRedirect) {
                response.redirect(options.failureRedirect);
            } else {
                next(new Error('User model is not found!'));
            }
        }
    }
}

module.exports = Authenticate;
