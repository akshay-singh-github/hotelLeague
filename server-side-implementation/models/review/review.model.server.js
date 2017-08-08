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
        findReviewByHotelId: findReviewByHotelId,
        UpdateReviewLikeByReviewId : UpdateReviewLikeByReviewId,
        UpdateReviewDisLikeByReviewId : UpdateReviewDisLikeByReviewId,
        deleteReview: deleteReview,
        getAllReviews: getAllReviews,
        setModel: setModel
    };

    return api;



    function getAllReviews() {

        return reviewModel.find();
    }





    function setModel(_model) {
        model = _model;
    }


    function UpdateReviewDisLikeByReviewId(review) {
        return reviewModel.update({_id: review._id},{Dislikes : review.Dislikes , DislikedBy : review.DislikedBy });
    }



    function UpdateReviewLikeByReviewId(review) {
        return reviewModel.update({_id: review._id},{Likes : review.Likes , LikedBy : review.LikedBy });
    }



    function deleteReview(reviewId) {
        return reviewModel.remove({_id: reviewId});
    }





    function createReview(review) {

        return reviewModel.create(review);
    }



    function findReviewByHotelId(resId) {
        return reviewModel.find({reviewFor: resId});
    }


};