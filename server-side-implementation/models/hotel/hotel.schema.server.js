/**
 * Created by XA on 03-Jul-17.
 */

module.exports = function () {

    var mongoose = require("mongoose");

    var hotelSchema = mongoose.Schema({
        hotelID: String,
        hotelName: String,
        openStatus :String,
        phoneNumber :String,
        hotelAddress :String,
        weekHours :[String],
        photoUrl :String,
        landmarkLocation : String,
        website : String,
        mapDetailsUrl : String,
        hotelCategory : [String],
        hotelRating : Number,
        hotelLatitude : Number,
        hotelLongitude : Number
    }, {collection:"hotelLeague.hotel"});

    return hotelSchema;
};