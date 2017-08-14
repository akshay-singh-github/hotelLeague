/**
 * Created by XA on 02-Aug-17.
 */

var https = require('https');
module.exports=function (app,model) {

    app.get("/api/getReview/:resId" , findReviewByHotelId);
    app.get("/api/getReviewByUser/:userId" , getReviewBycurrentUser);
    app.get("/api/getAllReviews" , getAllReviews);
    app.get("/api/getReviewsofFollowing/:userId", getReviewsofFollowing);
    app.post("/api/createReview" , createReview);
    app.put("/api/likeReview", likeReview);
    app.put("/api/dislikeReview", dislikeReview);
    app.put("/api/getUpdateReview", updateReview);
    app.delete('/api/deleteReview/:reviewId', deleteReview);





    function getReviewsofFollowing(req, res) {
        var userId = req.params.userId;

        model.userModel.findUserById(userId)
            .then(function (user) {
                var following = user.following;
                model.reviewModel.getReviewsofFollowing(following)
                    .then(function (result) {
                        console.log("this is the review of the  following",result);
                        res.json(result);
                    },function (error) {
                        res.json(error);
                    });
            });
    }






    function getReviewBycurrentUser(req, res) {

        var uid = req.params.userId;
        model.reviewModel
            .getReviewBycurrentUser(uid)
            .then(function (reviews) {
                if (reviews)
                {
                    res.json(reviews);
                }
                else{
                    res.sendStatus(404);
                }

            },function () {
                res.sendStatus(404);
            });

    }







    function updateReview(req, res) {
        var review = req.body;

        model.reviewModel.updateReview(review._id, review)
            .then(function (review) {
                res.json(review)
            })

    }



    function getAllReviews(req, res) {

        model.reviewModel.getAllReviews()
            .then(function (reviews) {
                res.json(reviews)
            })

    }








    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        console.log("delete review service server");
        model.reviewModel.deleteReview(reviewId)
            .then(function (result) {
                res.json(result);
            })

    }




    
    function dislikeReview(req, res) {
        var reviewObj = req.body;

        model.reviewModel.UpdateReviewDisLikeByReviewId(reviewObj)
            .then(function (review) {
                res.json(review)
            });

    }
    
    



    function likeReview(req, res) {

        var reviewObj = req.body;

        model.reviewModel.UpdateReviewLikeByReviewId(reviewObj)
            .then(function (review) {
                res.json(review)
            });

    }



    function createReview(req, res) {
        console.log("Inside Review server create");
        var reviewObject = req.body;
        console.log("reviewObject : ", reviewObject);
        model.reviewModel
            .createReview(reviewObject)
            .then(function (review) {
                console.log("review : ", review);
                res.json(review);
            });
    }




    function findReviewByHotelId(req, res) {
        var resId = req.params.resId;

        model.reviewModel
            .findReviewByHotelId(resId)
            .then(function (reviews) {
                if (reviews)
                {
                    res.json(reviews);
                }
                else{
                    res.sendStatus(404);
                }

            },function () {
                res.sendStatus(404);
            });
    }


};