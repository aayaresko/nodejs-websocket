/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 18.07.16.
 * Http module.
 *
 * Configures and initializes Http-server module.
 * Uses some handlers for application level errors and 404 errors.
 *
 * @see http://expressjs.com
 */
var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var cookieParser = require('cookie-parser');

var app = express();

var chatRoutes = require('../routes/chat');
var mainRoutes = require('../routes/main');

var authorizationMiddleware = require('../middlewares/authentication/quiet');

if (app.get('env') === 'development') {
    var logger = require('morgan');
        app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());

// set up session store
var sessionStore = require('./session')(app);

// check whether the current user is logged in
app.use(authorizationMiddleware());

app.set('view engine', 'twig');
app.set('views', __dirname + '/../views');
app.set('env', config.global.env);

app.use('/assets', express.static(__dirname + '/../public'));
app.use('/assets/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist'));

app.use('/', mainRoutes);
app.use('/chat', chatRoutes);

// handle non existing page error
app.use(function( request, response, next ) {
    response.status(404);
    response.render('404', { page: request.url });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function( error, request, response, next ) {
        response.status(error.status || 500);
        response.render('error', {
            message: error.message,
            error: error
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function( error, request, response, next ) {
    response.status(error.status || 500);
    response.render('error', {
        message: error.message,
        error: {}
    });
});

module.exports = app;