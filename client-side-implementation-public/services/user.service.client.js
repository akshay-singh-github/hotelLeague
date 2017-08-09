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
            getAllUsers : getAllUsers,
            getApiKey : getApiKey,
            findUserByUsername : findUserByUsername,
            findUserByUserId : findUserByUserId,
            checkLoggedInUser : checkLoggedInUser,
            checkAdminUser : checkAdminUser,
            logout : logout,
            updateUserProfile : updateUserProfile,
            unregisterUserProfile : unregisterUserProfile,
            findUserByUsernameRegex : findUserByUsernameRegex,
            getAllfollowers : getAllfollowers,
            getAllfollowing : getAllfollowing,
            deleteUser : deleteUser,
            createUser : createUser
            /*getHotelDetails : getHotelDetails*/


        };

        return api;


        function getAllUsers() {
            var url = "/api/getAllUsers";

            return $http.get(url)
                .then(function (result) {
                    return result.data;
                })

        }




        function getAllfollowing(userId) {
            var url= "/api/getAllfollowing/"+userId;
            return $http.get(url)
                .then(function (result) {
                    return result.data;
                })
        }


        function getAllfollowers(userId) {
            var url= "/api/getAllfollowers/"+userId;
            return $http.get(url)
                .then(function (result) {
                    return result.data;
                })

        }



        function findUserByUserId(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then(function (result) {
                    return result.data;
                })

        }



        function findUserByUsernameRegex(username) {

            var url = '/api/userRegex?username=' + username;

            return $http.get(url)
                .then(function (response) {
                    var users = response.data;
                    return users;
                });

        }


        
        function unregisterUserProfile() {

            var url = '/api/unregisterUserProfile';
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function createUser(user) {
            var url = "/api/createUser";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });

        }



        
        function deleteUser(user) {

            var url = '/api/deleteUserProfile/'+user._id;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }
        
        
        
        
        function updateUserProfile(userId, user) {

            var url = '/api/user/' + userId;

            return $http.put(url, user)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
            
        }
        
        
        
        
        
        
        
        function logout() {

            var url = '/api/logoutUser';
            return $http.post(url)
                .then(function(result){
                    return result.data;
                });
        }
        
        
        function checkAdminUser() {

            var url = '/api/checkAdminUser';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        
        

        
        function checkLoggedInUser() {
            var url = '/api/checkLoggedInUser';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        
        
        

        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;

            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
            
        }
        
        
        
        
        
        function register(userNew) {

            var url = "/api/register";
            return $http.post(url, userNew)
                .then(function (response) {
                    return response.data;
                });

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