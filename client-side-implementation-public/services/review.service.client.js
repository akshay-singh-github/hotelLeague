/**
 * Created by XA on 02-Aug-17.
 */

(function () {
    angular.module("HotelLeagueMaker")
        .factory("reviewService",reviewService);


    function reviewService($http) {


        var api = {
            createReview : createReview,
            getReviewBycurrentHotel : getReviewBycurrentHotel,
            getReviewBycurrentUser : getReviewBycurrentUser,
            deleteReview : deleteReview,
            likeReview : likeReview,
            getAllReviews : getAllReviews,
            dislikeReview : dislikeReview,
            updateReview : updateReview,
            getReviewsofFollowing : getReviewsofFollowing


        };

        return api;




        function getReviewsofFollowing(user) {

            var url = "/api/getReviewsofFollowing/"+user._id;

            return $http.get(url)
                .then(function (result) {
                    console.log("This is the review of the following",result);
                    return result.data;
                }, function (error) {
                    return error;
                });
        }





        function updateReview(review) {

            var url = "/api/getUpdateReview";
            return $http.put(url, review)
                .then(function (result) {
                    return result.data;
                });

        }




        function getAllReviews() {
            var url = "/api/getAllReviews";

            return $http.get(url)
                .then(function (result) {
                    return result.data;
                });

        }



        function dislikeReview(review) {

            var url = "/api/dislikeReview";

            return $http.put(url, review)
                .then(function (result) {
                    return result.data;
                });

        }





        function likeReview(review) {

            var url = "/api/likeReview";

            return $http.put(url, review)
                .then(function (result) {
                    return result.data;
                });

        }








        function createReview(reviewObject) {
            console.log("Inside review client create");
            var url = "/api/createReview";
            return $http.post(url, reviewObject)
                .then(function (response) {
                    return response;
                });
        }

        function getReviewBycurrentHotel(hotelId) {
            var url = "/api/getReview/"+hotelId;

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }





        function getReviewBycurrentUser(user) {
            var userId = user._id;

            var url = "/api/getReviewByUser/"+userId;

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }






        function deleteReview(review) {
            var url = '/api/deleteReview/'+review._id;
            console.log("delete review service client");
            return $http.delete(url)
                .then(function (result) {
                    return result.data;
                });
        }


    }


})();