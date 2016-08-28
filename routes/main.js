/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 18.07.16.
 * Main route module.
 *
 * Controls all routes for main application.
 * It also controls registration process (validation, password hashing, etc).
 *
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../entities/schemas/user');
var authenticationComponent = require('../middlewares/authentication/local');
var bcrypt = require('bcrypt');
var config = require('../config');

router.get('/', function( request, response, next ) {
    response.render('index');
});

router.get('/login', function( request, response, next ) {
    response.render('login', { message: request.flash('error') });
});

router.post(
    '/login',
    authenticationComponent.authenticate(
        'local',
        {
            successRedirect: '/chat',
            failureRedirect: '/login',
            failureFlash: true
        }
    )
);


router.get('/logout', function( request, response, next ) {
    if (request.user) {
        response.clearCookie('token');
        request.logout();
    }
    response.redirect('/login');
});

router.get('/register', function( request, response, next ) {
    if (request.user) {
        response.clearCookie('token');
        request.logout();
    }
    response.render('register');
});

router.post('/register', function( request, response, next ) {
    var user = UserModel(request.body);
    var errors = user.validateSync();
    if (errors) {
        response.render('register', { message: errors, model: user});
    } else {
        user.password = bcrypt.hashSync(user.password, 10);
        user.save(function( error ) {
            if (error) {
                response.render('register', { message: error.message, model: user });
            } else {
                response.redirect('/login');
            }
        });
    }
});

router.get('/contact', function( request, response, next ) {
    response.render('contact')
});

router.get('/socket\.io[?=\.&-_0-9a-zA-Z]+', function( request, response, next ) {
    response.status(204);
});

module.exports = router;