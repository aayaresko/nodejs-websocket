/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 20.07.16.
 * Quiet authentication control middleware.
 *
 * Sets local variable to simplify access to user status from any point of application.
 * This status used mainly for usability purposes - hide logout item from menu, show the login item, etc.
 *
 */
function Authenticate() {
    return function( request, response, next ) {
        if (!response.locals.authentication) {
            response.locals.authentication = {};
        }
        response.locals.authentication.isAuthenticated = request.isAuthenticated();
        next();
    }
}

module.exports = Authenticate;