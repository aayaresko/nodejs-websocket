/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 * MongoDb user schema.
 *
 * Holds all attributes of user entity.
 * Holds attribute types, default values, validation rules, etc.
 * Return a new instance of user model.
 * See mode info on mongoose model page.
 *
 * @see http://mongoosejs.com/docs/models.html
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    nickname: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: Date,
    isRegistered: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);