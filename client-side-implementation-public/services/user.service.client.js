/**
 * Created by XA on 03-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .factory("userService",userService);


    function userService($http) {


        var api = {
            login : login,
            register : register,
            getApiKey : getApiKey
            /*getHotelDetails : getHotelDetails*/


        };

        return api;


        function register(firstname, lastname,username, password, password2, email) {

            var url = "/api/register";
            var userObject = {
                firstName : firstname,
                lastName : lastname,
                username : username,
                password : password,
                emailId : email

            };

        }





        function login(username , password) {

            var url = "/api/login";
            var user = {
                username : username,
                password : password
            };


            return $http.post(url , user)
                .then(function (result) {
                    return result.data;
                });
        }




        function getHotelDetails(detailUrlObject) {

            var url = "/api/hotel/details";

            return $http.post(url,detailUrlObject)
                .then(function (result) {
                    return result;
                }, function (err) {
                    console.log(err);
                });

        }

        function searchNearbyHotels(searchUrlObject) {
            var url = "/api/hotel/search";

            return $http.post(url,searchUrlObject)
                .then(function (result) {
                    return result;
                }, function (err) {
                    console.log(err);
                });
        }

        function getApiKey() {
            var url = "/api/google/apiKey";

            return $http.get(url)
                .then(function (result) {
                    return result.data;
                }, function (err) {
                    console.log(err);
                });
        }



    }


})();