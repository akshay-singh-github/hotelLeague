/**
 * Created by XA on 26-Jul-17.
 */


module.exports = function () {

    var mongoose = require("mongoose");

    var messageSchema = mongoose.Schema({
        forUser: String,
        forUserId: String,
        from: String,
        date: {type: Date, default: Date.now},
        message_title: String,
        message_body: String,
        isMessageNew: {type: String, default: 'NEW', enum: ['NEW', 'OLD']},
        dateRead: {type: Date, default: Date.now}
    }, {collection: "hotelLeague.message"});

    return messageSchema;
};