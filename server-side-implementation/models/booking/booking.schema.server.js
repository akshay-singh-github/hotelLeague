/**
 * Created by XA on 31-Jul-17.
 */


module.exports = function () {

    var mongoose = require("mongoose");

    var bookingSchema = mongoose.Schema({
        forUser: String,
        forUserId: String,
        name :String,
        surname :String,
        email :String,
        phone :String,
        checkinDate :String,
        checkinMonth :String,
        checkinYear :String,
        checkoutDate : String,
        checkoutMonth : String,
        checkoutYear : String,
        MemberCount : Number,
        Instructions :String
    }, {collection:"hotelLeague.booking"});

    return bookingSchema;
};