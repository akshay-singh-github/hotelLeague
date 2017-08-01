/**
 * Created by XA on 31-Jul-17.
 */

(function () {
    angular.module("HotelLeagueMaker")
        .factory("bookingService",bookingService);


    function bookingService($http) {


        var api = {
            createBooking : createBooking,
            getBookingBycurrentUser : getBookingBycurrentUser,
            deleteBooking : deleteBooking


        };

        return api;


        function createBooking(bookingObj) {
            console.log("Inside booking client create");
            var url = "/api/createBooking";
            return $http.post(url, bookingObj)
                .then(function (response) {
                    return response;
                });
        }

        function getBookingBycurrentUser() {
            var url = "/api/getBooking";

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }

        function deleteBooking() {

        }


    }


})();