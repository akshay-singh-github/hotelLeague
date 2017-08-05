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
            dislikeReview : dislikeReview


        };

        return api;


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

        function deleteReview() {

        }


    }


})();