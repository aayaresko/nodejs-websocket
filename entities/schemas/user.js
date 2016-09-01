/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 * Redis user model.
 *
 * Holds all attributes of user entity.
 * Holds attribute types, default values, etc.
 * Return a new instance of user model.
 * See mode info on mongoose model page.
 *
 */

function Init( Schema ) {
    var User = Schema.define('user',
    {
        id: {
            type: Schema.Number,
            index: true
        },
        nickname: {
            type: Schema.String,
            unique: true,
            index: true
        },
        firstName: {
            type: Schema.String
        },
        lastName: {
            type: Schema.String
        },
        email: {
            type: Schema.String,
            unique: true,
            index: true
        },
        password: {
            type: Schema.String
        },
        birthday: {
            type: Schema.Date
        },
        createdAt: {
            type: Schema.Date,
            default: Date.now()
        }
    },
    {
        primaryKeys: ['id']
    }
);

    return User;
}

module.exports = Init;