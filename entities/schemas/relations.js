/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 01.09.16.
 *
 * Describe relations between redis models.
 *
 */

function Init( Schema ) {
    var Message = Schema.models.message;
    var User = Schema.models.user;
    User.hasMany(Message, { as: 'message', foreignKey: 'userId' });
    Message.belongsTo(User, { as: 'author', foreignKey: 'userId' });
}

module.exports = Init;