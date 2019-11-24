let express = require('express');
let router = express.Router();
let authorizationMiddleware = require('../middlewares/authorization/force');
let authenticationMiddleware = require('../middlewares/authentication/jwt');

// first callback: if request.user model is set - creates a new JWT token and send it back to the client
// second callback: validate current client request - will pass through only if request.user model if set
// third callback: if all preview callback successfully executed - render chat page and attach user model to it
router.get('/',
    authenticationMiddleware({
        failureRedirect: '/login'
    }),
    authorizationMiddleware({
        failureRedirect: '/login'
    }),
    function (request, response, next) {
        response.render('chat', { model: request.user });
    }
);

module.exports = router;