function Init( app ) {
    let config = require('../config'),
        redis = require('redis'),
        passport = require('passport'),
        session = require('express-session'),
        RedisStore = require('connect-redis')(session),
        client = redis.createClient({
            host: config.redis.host,
            port: config.redis.port,
            expire: 86400
        }),
        sessionStore = new RedisStore({ client });
    
    let flash = require('connect-flash');

    app.use(
        session({
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