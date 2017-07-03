/**
 * Created by XA on 03-Jul-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("userRegisterController", userRegisterController);

    function userRegisterController(userService) {
        var model = this;

        model.register = register;

        function register(firstname, lastname,username, password, password2, email) {
            model.usernamemessage="";
            model.passwordmessage="";
            model.error="";

            if (!username && !password && !password2) {
                model.error = "Incomplete Fields , Cannot Register";
                model.passwordmessage = "Password is Required";
                model.usernamemessage="Username is Required";
                return;
            }

            if(!username){
                model.error = "Incomplete Fields , Cannot Register";
                model.usernamemessage="Username is Required";
                return;
            }

            if(!password || !password2){
                model.error = "Incomplete Fields , Cannot Register";
                model.passwordmessage = "Password is Required";
                return
            }


            if (password !== password2) {
                model.error = "Password must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "Username is not available";
                }, function () {
                    var userNew = {
                        username: username,
                        password: password
                    };

                    return userService
                        .register(userNew);
                })
                .then(function (user) {
                    $location.url('/');
                });
        }

    }

})();