/**
 * Created by XA on 02-Aug-17.
 */

(function () {
    angular.module("HotelLeagueMaker")
        .factory("hotelService", hotelService);


    function hotelService($http) {


        var api = {
            createHotel: createHotel,
            findHotelById: findHotelById,
            deleteHotel: deleteHotel


        };

        return api;


        function createHotel(hotelObject) {
            /*console.log("Inside hotel client create");*/
            var url = "/api/createHotel";
            return $http.post(url, hotelObject)
                .then(function (response) {
                    return response;
                });
        }

        function findHotelById(hotelId) {
            var url = "/api/getHotel/" + hotelId;

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }

        function deleteHotel() {

        }


    }


})();