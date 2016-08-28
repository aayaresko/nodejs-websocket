/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 19.07.16.
 * Force authorization middleware.
 *
 * Controls access to application resources.
 * Allows access only for authorized users and block access for unauthorized users.
 * Authorization check is based on passport method [[isAuthenticated()]].
 * Therefore the one must use this middleware in conjunction with quiet authentication middleware.
 * Runs the failure callback if [[options.failureRedirect]] are specified
 * Runs the success callback if [[options.successRedirect]] are specified.
 *
 */
function Authorize( options ) {
    return function( request, response, next ) {
        if (!request.isAuthenticated()) {
            if (options.failureRedirect) {
                response.redirect(options.failureRedirect);
            } else {
                next(new Error('User is not authenticated'));
            }
        } else {
            if (options.successRedirect) {
                response.redirect(options.successRedirect);
            } else {
                next();
            }
        }
    }
}

module.exports = Authorize;