/**
 * Created by XA on 02-Aug-17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var reviewSchema = require('./review.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var reviewModel = mongoose.model('reviewModel', reviewSchema);

    var api = {

        createReview: createReview,
        findBookingByRestaurantId: findBookingByRestaurantId,
        deleteReview: deleteReview,
        setModel: setModel
    };

    return api;






    function setModel(_model) {
        model = _model;
    }

    function deleteReview(reviewId) {
        return reviewModel.remove({_id: reviewId});
    }





    function createReview(review) {

        return reviewModel.create(review);
    }



    function findBookingByRestaurantId(resId) {
        return reviewModel.find({reviewFor: resId});
    }


};