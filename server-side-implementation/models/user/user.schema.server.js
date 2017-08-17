/**
 * Created by XA on 03-Jul-17.
 */

module.exports = function () {

    var mongoose = require("mongoose");

    var userSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: {type: String, require: true},
        firstName: String,
        lastName: String,
        roles: [{
            type: String,
            default: 'USER',
            enum: ['USER', 'ADMIN']
        }],
        google: {
            id: String,
            token: String
        },
        facebook: {
            id: String,
            token: String
        },
        emailId: String,
        phone: String,
        followedBy: [String],
        following: [String],
        favoriteHotelBooking: [String],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "hotelLeague.user"});

    return userSchema;
};