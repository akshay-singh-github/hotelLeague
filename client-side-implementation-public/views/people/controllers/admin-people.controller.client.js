/**
 * Created by XA on 07-Aug-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("adminController", adminController);

    function adminController($route, currentUser,bookingService,$window,reviewService, userService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.getAllUsers = getAllUsers;
        model.getAllBookings = getAllBookings;
        model.getAllReviews = getAllReviews;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.logout = logout;

        /*model.login = login;

        model.searchUser = searchUser;
        model.showUserDetails = showUserDetails;
        model.addAsFollower = addAsFollower;
        model.removeAsFollower = removeAsFollower;
        model.getAllBookingsForUser = getAllBookingsForUser;
        model.addAsFavoriteBooking = addAsFavoriteBooking;
        model.removeAsFavoriteBooking = removeAsFavoriteBooking;
        model.getAllFavoriteBookingsForUser = getAllFavoriteBookingsForUser;*/



/*
        username: {type: String, unique: true},
        password: {type: String, require: true},
        firstName: String,
            lastName: String,
            roles:[{type:String,
            default:'USER',
            enum:['USER','ADMIN']}],
            google: {
            id: String,
                token: String
        },
        facebook: {
            id:    String,
                token: String
        },
        emailId: String,
            phone: String,
            followedBy:[String],
            following:[String],
            favoriteHotelBooking:[String],
            dateCreated: {type: Date, default: Date.now}*/











        /*model.favoritebookings*/

        function init() {
            model.getAllUsers();
            model.getAllBookings();
            model.getAllReviews();
            model.updateUserMessage = "";
            model.errorupdateUser = "";
            /*model.getAllBookingsForUser();
            model.getAllFavoriteBookingsForUser();
            model.showUserDetailsFlag = false;*/
        }
        init();


        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })

        }


        function createUser(user) {
            console.log("inside create");
            model.usernamecreateUsermessage="";
            model.passwordcreateUsermessage="";
            model.createUsersubmitted="";
            model.errorcreateUser="";
            model.successcreateUser="";
            console.log("user",user);

            if(!user){
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.createUsersubmitted= "yes";
                return;
            }

            if (!user.username && !user.password && !model.createUserpassword2) {
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.passwordcreateUsermessage = "Password is Required";
                model.usernamecreateUsermessage="Username is Required";
                model.createUsersubmitted= "yes";
                return;
            }

            if(!user.username){
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.usernamecreateUsermessage="Username is Required";
                model.createUsersubmitted= "yes";
                return;
            }

            if(!user.password || !model.createUserpassword2){
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.passwordcreateUsermessage = "Password is Required";
                model.createUsersubmitted= "yes";
                return
            }


            if (user.password !== model.createUserpassword2) {
                model.errorcreateUser = "Password must match";
                model.createUsersubmitted= "yes";
                return;
            }
            model.createUsersubmitted= "";
            userService
                .findUserByUsername(user.username)
                .then(function () {
                    model.errorcreateUser = "Username is not available";
                    $window.scrollTo(0, 0);
                }, function () {
                    console.log("this user can be registered");
                    /*var userNew = {
                        firstName:firstname,
                        lastName : lastname,
                        emailId:email,
                        username: username,
                        password: password
                    };*/
                    model.successcreateUser = "The new user has been created.";
                    console.log("before register done",user);
                    return userService
                        .createUser(user);
                })
                .then(function (user) {
                    console.log("after register done",user);
                    $route.reload();
                    /*$location.url('/');*/
                });
        }




        function updateUser(user) {
            model.updateUserMessage = "";
            model.errorupdateUser = "";
            /*user.roles.toUpperCase();*/
                userService
                    .updateUserProfile(user._id, user)
                    .then(function (result) {
                        console.log("this is the user after upper case",result);
                        model.updateUserMessage = "User with Username : "+user.username+" has been updated.";
                        $window.scrollTo(0, 0);
                    }, function () {
                        model.errorupdateUser = "This user could not be updated."
                    });

        }




        function deleteUser(user){

            userService
                .deleteUser(user)
                .then(function (result) {

                    console.log("this user has been deleted", result);
                    $route.reload();
                })
        }




        function getAllUsers() {
            userService.getAllUsers()
                .then(function (result) {
                    model.Allusers = result;
                    console.log("getAllUsers",result);
                })

        }
        
        function getAllBookings() {
            bookingService.getAllBookings()
                .then(function (result) {
                    model.AllBookings = result;
                    console.log("getAllBookings",result);
                })
        }


        function getAllReviews() {
            reviewService.getAllReviews()
                .then(function (result) {
                    model.AllReviews = result;
                    console.log("getAllReviews",result);
                })
        }



        /*function getAllFavoriteBookingsForUser() {

            bookingService.getAllFavoriteBookingsForUser()
                .then(function (result) {
                    console.log("Fav bookings in controller", result);
                    model.favoritebookings = result.data;
                    console.log("model.favoritebookings", model.favoritebookings);
                })

        }




        function addAsFavoriteBooking(booking) {

            model.currentUser.favoriteHotelBooking.push(booking._id);
            userService.updateUserProfile(model.currentUser._id, model.currentUser)
                .then(function (result) {
                    $route.reload();
                    return result;
                });
        }



        function removeAsFavoriteBooking(booking) {
            var index = model.currentUser.favoriteHotelBooking.indexOf(booking._id);
            if(index >= 0){
                model.currentUser.favoriteHotelBooking.splice(index, 1);
                userService.updateUserProfile(model.currentUser._id, model.currentUser)
                    .then(function (result) {
                        $route.reload();
                        return result;
                    });

            }
        }




        function getAllBookingsForUser() {

            bookingService.getBookingBycurrentUser()
                .then(function (result) {
                    model.bookings = result.data;
                    console.log("model.bookings", model.bookings);
                })
        }


        function addAsFollower(user) {
            console.log("Current card User", user);

            userService.findUserByUsername(currentUser.username)
                .then(function (result) {
                    if(result.following.indexOf(user._id) < 0){
                        result.following.push(user._id);
                        userService.updateUserProfile(result._id,result)
                            .then(function (output) {
                                console.log("This is the updated User",output);

                                if (user.followedBy.indexOf(result._id) < 0){
                                    user.followedBy.push(result._id);
                                    userService.updateUserProfile(user._id, user)
                                        .then(function (response) {
                                            console.log("This is the updated followed User",response);
                                        })
                                }
                            })
                    }
                    console.log("This is the returned user outside if", result);

                },function (error) {
                    console.log("This is the returned error.",error);
                })





        }




        function removeAsFollower(user) {
            console.log("Current User", user);

            userService.findUserByUsername(currentUser.username)
                .then(function (result) {
                    if(result.following.indexOf(user._id) >= 0){
                        var index = result.following.indexOf(user._id);
                        result.following.splice(index, 1);
                        userService.updateUserProfile(result._id,result)
                            .then(function (output) {
                                console.log("This is the updated User",output);

                                if (user.followedBy.indexOf(result._id) >= 0){
                                    var index2 = user.followedBy.indexOf(result._id);
                                    user.followedBy.splice(index2, 1);
                                    userService.updateUserProfile(user._id, user)
                                        .then(function (response) {
                                            console.log("This is the updated followed User",response);
                                        })
                                }
                            })
                    }
                    console.log("This is the returned user outside if", result);

                },function (error) {
                    console.log("This is the returned error.",error);
                })

        }







        function showUserDetails(user) {
            model.showUserDetailsFlag=true;
            model.thisusername = user.username;
            model.thisfirstName = user.firstName;
            model.thislastName = user.lastName;
            model.thisemailId = user.emailId;
            model.thisphone = user.phone;
        }

        function searchUser(username) {
            model.showUserDetailsFlag = false;
            userService
                .findUserByUsernameRegex(username)
                .then(function (result) {
                    model.foundUsers = result;
                })
        }





        function login(username , password) {

            model.usernamemessage="";
            model.passwordmessage="";
            model.error = "";


            if (!username && !password){
                model.usernamemessage="Username is Required";
                model.passwordmessage = "Password is Required";
                model.error = "Incomplete Credentials";
            }
            else if(!password){
                model.passwordmessage = "Password is Required";
                model.error = "Incomplete Credentials";
            }

            else if(!username){
                model.usernamemessage="Username is Required";
                model.error = "Incomplete Credentials";
            }
            else{

                userService
                    .login(username, password)
                    .then(function (found) {
                        console.log(found);
                        if (found !== null) {
                            model.message = "Welcome " + username;
                            $location.url('/');
                        }
                        else {
                            model.error = "Sorry, " + username + " not found. Please try again.";
                        }

                    },function () {
                        model.error = "Sorry, " + username + " not found or mismatch of Credentials. Please try again.";
                    });

            }













            /!*userService.login(username, password)
             .then(function (result) {
             console.log("This is user", result);
             });*!/
        }*/






    }

})();