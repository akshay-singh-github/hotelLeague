/**
 * Created by XA on 02-Aug-17.
 */

var https = require('https');
module.exports=function (app,model) {

    app.get("/api/getReview/:resId" , findReviewByHotelId);
    app.post("/api/createReview" , createReview);






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