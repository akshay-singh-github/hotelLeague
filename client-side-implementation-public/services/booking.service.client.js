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
            getAllFavoriteBookingsForUser : getAllFavoriteBookingsForUser,
            deleteBooking : deleteBooking,
            getAllBookings : getAllBookings


        };

        return api;




        function getAllBookings() {
            var url = "/api/getAllBookings";
            return $http.get(url)
                .then(function (response) {
                    console.log("getAllBookings", response);
                    return response.data;
                });

        }





        function getAllFavoriteBookingsForUser() {
            var url = "/api/getFavoriteBooking";

            return $http.get(url)
                .then(function (response) {
                    console.log("Fav bookings in client", response);
                    return response;
                });

        }


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