/**
 * Created by XA on 02-Aug-17.
 */

module.exports = function () {

    var mongoose = require("mongoose");

    var reviewSchema = mongoose.Schema({
        ReviewTitle: String,
        ReviewContent: String,
        reviewer: String,
        reviewFor: String,
        reviewHotelName: String,
        reviewerId: String,
        date: {type: Date, default: Date.now},
        rating: Number,
        Likes: {type: Number, min: 0, default: 0},
        LikedBy: [String],
        DislikedBy: [String],
        Dislikes: {type: Number, min: 0, default: 0}
    }, {collection: "hotelLeague.review"});

    return reviewSchema;
};