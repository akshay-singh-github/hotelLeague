/**
 * Created by XA on 03-Jul-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("userLoginController", userLoginController);
    
    function userLoginController(userService) {
        var model = this;

        model.login = login;

        function login(username , password) {
            userService.login(username, password)
                .then(function (result) {
                    console.log("This is user", result);
                });
        }

    }
    
})();