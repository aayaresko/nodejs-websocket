/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 *
 * Redis message model.
 *
 * Holds all attributes of message entity.
 * Holds attribute types, default values, etc.
 * Return a new instance of message model.
 *
 */

function Init( Schema ) {
    var Message = Schema.define('message',
        {
            id: {
                type: Schema.Number,
                index: true
            },
            content: {
                type: Schema.String
            },
            userId: {
                type: Schema.Number,
                index: true
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

    return Message;
}

module.exports = Init;