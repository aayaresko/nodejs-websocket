/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 21.07.16.
 * Session module.
 *
 * Configures and initializes session storage.
 * Uses Redis as session storage.
 * Includes flash messages module.
 * Return configured and initialized session storage.
 *
 */
function Init( app ) {
    var config = require('../config');
    var passport = require('passport');
    var session = require('express-session');
    var RedisStore = require('connect-redis')(session);
    var sessionStore = new RedisStore({
        host: config.redis.host,
        port: config.redis.port,
        expire: 86400
    });
    var flash = require('connect-flash');

    app.use(session({
            store: sessionStore,
            secret: config.global.secret,
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    return RedisStore;
}

module.exports = Init;