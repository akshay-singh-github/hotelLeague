/**
 * Created by XA on 02-Aug-17.
 */

module.exports = function () {

    var mongoose = require("mongoose");

    var reviewSchema = mongoose.Schema({
        ReviewTitle: String,
        ReviewContent: String,
        reviewer :String,
        reviewFor :String,
        reviewerId :String,
        rating : Number,
        Likes : Number,
        Dislikes : Number
    }, {collection:"hotelLeague.review"});

    return reviewSchema;
};