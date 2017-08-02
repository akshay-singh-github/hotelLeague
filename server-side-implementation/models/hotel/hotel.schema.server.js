/**
 * Created by XA on 03-Jul-17.
 */

module.exports = function () {

    var mongoose = require("mongoose");

    var hotelSchema = mongoose.Schema({
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

    return hotelSchema;
};