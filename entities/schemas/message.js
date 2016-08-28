/*
 * Copyright (c) 2016  Andrey Yaresko.
 */

/**
 * Created by aayaresko on 17.07.16.
 * MongoDb message schema.
 *
 * Holds all attributes of message entity.
 * Holds attribute types, default values, validation rules, etc.
 * Return a new instance of message model.
 * See mode info on mongoose model page.
 *
 * @see http://mongoosejs.com/docs/models.html
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Message', MessageSchema);