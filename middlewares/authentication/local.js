/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 19.07.16.
 * Authentication component.
 *
 * Authenticates users - checks username and password.
 * User password is encrypted by brcypt.
 * Store users data is [[request.user]].
 * Creates a new session and stores it in session storage. Id of this session will be saved in user cookie.
 *
 * @see https://www.npmjs.com/package/passport-local
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('../../entities/schemas/user');

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

passport.serializeUser(function( user, done ) {
    done(null, user.id);
});
passport.deserializeUser(function( id, done ) {
    User.findOne({ _id: id }, function( error, user ) {
        done(error, user);
    });
});
passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function( email, password, done ) {
            User.findOne({ email: email }, function( error, user ) {
                if (error) {
                    return done(error);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect nickname.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.'});
                }
                return done(null, user);
            });
        }
    )
);

module.exports = passport;