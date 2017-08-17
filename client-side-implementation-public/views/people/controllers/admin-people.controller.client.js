/**
 * Created by XA on 07-Aug-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("adminController", adminController);

    function adminController($route, currentUser, messageService, bookingService, $window, reviewService, userService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.getAllUsers = getAllUsers;
        model.getAllBookings = getAllBookings;
        model.getAllReviews = getAllReviews;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.updateBooking = updateBooking;
        model.deleteBooking = deleteBooking;
        model.logout = logout;
        model.getMessageBycurrentUser = getMessageBycurrentUser;
        model.getNewMessageCount = getNewMessageCount;


        function init() {
            getMessageBycurrentUser();
            model.getAllUsers();
            model.getAllBookings();
            model.getAllReviews();
            model.updateUserMessage = "";
            model.errorupdateUser = "";
            model.usernamecreateUsermessage = "";
            model.passwordcreateUsermessage = "";
            model.createUsersubmitted = "";
            model.errorcreateUser = "";
            model.successcreateUser = "";
        }

        init();


        function getNewMessageCount(messageArray) {
            model.newMessageCountVar = 0;
            for (var i in messageArray) {
                if (messageArray[i].isMessageNew === 'NEW') {
                    model.newMessageCountVar = model.newMessageCountVar + 1;
                }
            }

            /*console.log("model.newMessageCountVar",model.newMessageCountVar)*/

        }


        function getMessageBycurrentUser() {
            messageService.getMessageBycurrentUser(model.currentUser)
                .then(function (result) {
                    model.allMessages = result.data;
                    model.getNewMessageCount(model.allMessages);
                    /*console.log("This all Messages for user", model.allMessages)*/
                }, function (error) {
                    console.log(error)
                });
        }


        function deleteBooking(booking) {
            bookingService.deleteBooking(booking)
                .then(function (result) {
                    $route.reload();
                    return result;
                })
        }


        function updateBooking(bookingObject) {
            /*console.log("Inside booking controller create");*/
            /*console.log(bookingObject);*/
            model.successMessage = "";
            model.error = "";
            model.nameMessage = "";
            model.contactMessage = "";
            model.checkinMessage = "";
            model.checkoutMessage = "";
            model.MemberCountMessage = "";
            model.submitted = true;

            if (!bookingObject) {
                model.error = "Booking could not be done. Please fill all the details and try again.";
                $window.scrollTo(0, 0);
            }
            else if (bookingObject && (!bookingObject.name || !bookingObject.surname)) {
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.nameMessage = "Please enter all the Guest name fields.";
                $window.scrollTo(0, 0);
            }
            else if (bookingObject && (!bookingObject.email || !bookingObject.phone)) {

                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.contactMessage = "Please enter all the Guest contact fields.";
                $window.scrollTo(0, 0);

            }
            else if (bookingObject && (!bookingObject.checkinDate || !bookingObject.checkinMonth || !bookingObject.checkinYear)) {
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.checkinMessage = "Please enter all the Hotel Check-in fields.";
                $window.scrollTo(0, 0);
            }
            else if (bookingObject && (!bookingObject.checkoutDate || !bookingObject.checkoutMonth || !bookingObject.checkoutYear)) {
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.checkoutMessage = "Please enter all the Hotel Check-out fields.";
                $window.scrollTo(0, 0);
            }
            else if (bookingObject && (!bookingObject.MemberCount)) {
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.MemberCountMessage = "Please enter the number of guests.";
                $window.scrollTo(0, 0);
            }
            else {

                model.submitted = false;
                userService.findUserByUsername(bookingObject.forUser)
                    .then(function (result) {
                        if (!result || typeof result === "undefined") {
                            model.error = "This User does not exist.";
                            $window.scrollTo(0, 0);
                        }
                        else {

                            if (parseInt(bookingObject.checkoutYear) > parseInt(bookingObject.checkinYear)) {


                                model.successMessage = "Booking has been updated Successfully!!!.";
                                bookingObject.forUserId = result._id;
                                bookingService
                                    .updateBooking(bookingObject)
                                    .then(function (result) {
                                        $window.scrollTo(0, 0);
                                        /*console.log("bookingObject", bookingObject);*/
                                        return result.data;
                                    });

                            }
                            else if (parseInt(bookingObject.checkoutYear) === parseInt(bookingObject.checkinYear)) {
                                if (parseInt(bookingObject.checkoutMonth) > parseInt(bookingObject.checkinMonth)) {

                                    model.successMessage = "Booking has been updated Successfully!!!.";
                                    bookingObject.forUserId = result._id;
                                    bookingService
                                        .updateBooking(bookingObject)
                                        .then(function (result) {
                                            $window.scrollTo(0, 0);
                                            /*console.log("bookingObject", bookingObject);*/
                                            return result.data;
                                        });
                                }


                                else if (parseInt(bookingObject.checkoutMonth) === parseInt(bookingObject.checkinMonth)) {
                                    if (parseInt(bookingObject.checkoutDate) >= parseInt(bookingObject.checkinDate)) {

                                        model.successMessage = "Booking has been updated Successfully!!!.";
                                        bookingObject.forUserId = result._id;
                                        bookingService
                                            .updateBooking(bookingObject)
                                            .then(function (result) {
                                                $window.scrollTo(0, 0);
                                                /*console.log("bookingObject", bookingObject);*/
                                                return result.data;
                                            });

                                    }
                                    else {
                                        model.error = "Booking could not be done. Please check the timings.";
                                        $window.scrollTo(0, 0);
                                    }

                                }
                                else {
                                    model.error = "Booking could not be done. Please check the timings.";
                                    $window.scrollTo(0, 0);
                                }

                            }
                            else {
                                model.error = "Booking could not be done. Please check the timings.";
                                $window.scrollTo(0, 0);
                            }

                        }

                    }, function () {
                        model.error = "This User does not exist.";
                        $window.scrollTo(0, 0);
                    });

            }
        }


        function deleteReview(review) {
            reviewService.deleteReview(review)
                .then(function (result) {
                    $route.reload();
                    return result;
                })

        }


        function updateReview(reviewObject) {
            model.Reviewerror = "";
            model.ReviewsuccessMessage = "";
            model.ReviewTitleMessage = "";
            model.Reviewsubmitted = true;
            model.messageReviewContent = "";

            if (!reviewObject) {
                model.Reviewerror = "Review could not be updated. Please fill all the details and try again.";
                $window.scrollTo(0, 0);
            }
            else if (reviewObject && (!reviewObject.ReviewTitle)) {
                model.Reviewerror = "Review could not be updated. Please fill all the details and try again.";
                model.ReviewTitleMessage = "Please fill the review title field.";
                $window.scrollTo(0, 0);
            }
            else if (reviewObject && (!reviewObject.ReviewContent)) {
                model.Reviewerror = "Review could not be updated. Please fill all the details and try again.";
                model.messageReviewContent = "Please fill the review content field.";
                $window.scrollTo(0, 0);
            }
            else {
                model.Reviewsubmitted = false;
                model.ReviewsuccessMessage = "The review has been successfully updated.";
                /*console.log("This is the review object",reviewObject);*/
                reviewService.updateReview(reviewObject)
                    .then(function (result) {
                        $window.scrollTo(0, 0);
                        /*console.log("result",result);*/
                    });
            }

        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })

        }


        function createUser(user) {
            var mainRoles = ['ADMIN', 'USER'];
            /*console.log("inside create");*/
            model.usernamecreateUsermessage = "";
            model.passwordcreateUsermessage = "";
            model.createUsersubmitted = "";
            model.errorcreateUser = "";
            model.successcreateUser = "";
            /*console.log("user",user);*/

            if (!user) {
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.createUsersubmitted = "yes";
                return;
            }

            if (!user.username && !user.password && !model.createUserpassword2) {
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.passwordcreateUsermessage = "Password is Required";
                model.usernamecreateUsermessage = "Username is Required";
                model.createUsersubmitted = "yes";
                return;
            }

            if (!user.username) {
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.usernamecreateUsermessage = "Username is Required";
                model.createUsersubmitted = "yes";
                return;
            }

            if (!user.password || !model.createUserpassword2) {
                model.errorcreateUser = "Incomplete Fields , Cannot Register.";
                model.passwordcreateUsermessage = "Password is Required";
                model.createUsersubmitted = "yes";
                return;
            }


            if (user.password !== model.createUserpassword2) {
                model.errorcreateUser = "Password must match";
                model.createUsersubmitted = "yes";
                return;
            }
            model.createUsersubmitted = "";
            userService
                .findUserByUsername(user.username)
                .then(function () {
                    model.errorcreateUser = "Username is not available";
                    $window.scrollTo(0, 0);
                }, function () {
                    /*console.log("this user can be registered");*/
                    /*console.log("before register done",user);*/
                    return userService
                        .createUser(user)
                        .then(function (result) {
                            /*console.log("this is the result of the create user",result);*/
                            if (result.name === "ValidationError") {
                                model.errorcreateUser = "Roles can only accept USER or ADMIN or both together separated by comma. 'User' not created.";
                                $window.scrollTo(0, 0);
                            }
                            else {
                                /*console.log("after register done",result);*/
                                model.successcreateUser = "The new user has been created.";
                                $route.reload();
                            }
                        }, function (error) {
                            model.errorcreateUser = "Error occurred, User not created.";
                            $window.scrollTo(0, 0);
                            console.log(error);
                        });
                });
        }


        function updateUser(user) {

            model.updateUserMessage = "";
            model.errorupdateUser = "";

            if (typeof user.roles === "string" || user.roles instanceof String) {
                /*console.log("update user.roles", user.roles);*/
                user.roles = user.roles.replace(/\s/g, '');
                user.roles = user.roles.toUpperCase();
                var tempArray = user.roles.split(",");

                /*console.log("update user.roles", user.roles);*/
                /*console.log("update tempArray.tempArray", tempArray);*/
                for (var j in tempArray) {
                    if ((tempArray[j] !== "USER") && (tempArray[j] !== "ADMIN")) {
                        model.errorupdateUser = "Roles can be either 'ADMIN', 'USER' or 'ADMIN,USER'";
                        $window.scrollTo(0, 0);
                        return;
                    }

                }

            }


            userService
                .updateUserProfile(user._id, user)
                .then(function (result) {
                    /*console.log("this is the user after upper case",result);*/
                    model.updateUserMessage = "User with Username : " + user.username + " has been updated.";
                    $window.scrollTo(0, 0);
                }, function () {
                    model.errorupdateUser = "This user could not be updated.";
                    $window.scrollTo(0, 0);
                });

        }


        function deleteUser(user) {

            userService
                .deleteUser(user)
                .then(function (result) {

                    /*console.log("this user has been deleted", result);*/
                    $route.reload();
                })
        }


        function getAllUsers() {
            userService.getAllUsers()
                .then(function (result) {
                    model.Allusers = result;
                    /*console.log("getAllUsers",result);*/
                })

        }


        function getAllBookings() {
            bookingService.getAllBookings()
                .then(function (result) {
                    model.AllBookings = result;
                    /*console.log("getAllBookings",result);*/
                })
        }


        function getAllReviews() {
            reviewService.getAllReviews()
                .then(function (result) {
                    model.AllReviews = result;
                    /*console.log("getAllReviews",result);*/
                })
        }


    }

})();