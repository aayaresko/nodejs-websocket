let config = {};

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