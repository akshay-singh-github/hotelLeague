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
            deleteReview : deleteReview,
            likeReview : likeReview,
            getAllReviews : getAllReviews,
            dislikeReview : dislikeReview,
            updateReview : updateReview


        };

        return api;




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