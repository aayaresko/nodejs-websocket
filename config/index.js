/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 19.07.16.
 */
var config = {};

config.redis = {
    host: 'localhost',
    port: 6379
};
config.mongoose = {
    host: 'localhost',
    database: 'nodejs',
    port: 27017
};
config.global = {
    secret: 'your_secrete_here',
    port: 8081,
    env: 'development',
    author: {
        email: 'aayaresko@gmail.com',
        name: 'Andrey Yaresko',
        url: 'https://github.com/aayaresko'
    }
};
module.exports = config;