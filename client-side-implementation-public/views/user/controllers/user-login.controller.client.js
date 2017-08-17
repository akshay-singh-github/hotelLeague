/**
 * Created by XA on 03-Jul-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("userLoginController", userLoginController);

    function userLoginController($route, currentUser, userService, $location) {
        var model = this;

        model.login = login;
        model.logout = logout;
        model.currentUser = currentUser;


        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })

        }


        function login(username, password) {

            model.usernamemessage = "";
            model.passwordmessage = "";
            model.error = "";


            if (!username && !password) {
                model.usernamemessage = "Username is Required";
                model.passwordmessage = "Password is Required";
                model.error = "Incomplete Credentials";
            }
            else if (!password) {
                model.passwordmessage = "Password is Required";
                model.error = "Incomplete Credentials";
            }

            else if (!username) {
                model.usernamemessage = "Username is Required";
                model.error = "Incomplete Credentials";
            }
            else {

                userService
                    .login(username, password)
                    .then(function (found) {
                        /*console.log(found);*/
                        if (found !== null) {
                            model.message = "Welcome " + username;
                            $location.url('/');
                        }
                        else {
                            model.error = "Sorry, " + username + " not found. Please try again.";
                        }

                    }, function () {
                        model.error = "Sorry, " + username + " not found or mismatch of Credentials. Please try again.";
                    });

            }
        }


    }

})();