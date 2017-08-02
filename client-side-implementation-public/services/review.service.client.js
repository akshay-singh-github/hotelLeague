/**
 * Created by XA on 02-Aug-17.
 */

(function () {
    angular.module("HotelLeagueMaker")
        .factory("reviewService",reviewService);


    function reviewService($http) {


        var api = {
            createReview : createReview,
            getReviewBycurrentRestaurant : getReviewBycurrentRestaurant,
            deleteReview : deleteReview


        };

        return api;


        function createReview(reviewObject) {
            console.log("Inside review client create");
            var url = "/api/createReview";
            return $http.post(url, reviewObject)
                .then(function (response) {
                    return response;
                });
        }

        function getReviewBycurrentRestaurant(restaurantId) {
            var url = "/api/getReview/"+restaurantId;

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }

        function deleteReview() {

        }


    }


})();