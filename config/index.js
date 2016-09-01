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

config.global = {
    secret: 'none',
    port: 8081,
    env: 'development',
    author: {
        email: '',
        name: '',
        url: ''
    }
};

module.exports = config;