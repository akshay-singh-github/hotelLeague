/**
 * Created by XA on 05-Jul-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("userProfileController", userProfileController);

    function userProfileController($route, reviewService, messageService, currentUser, userService, $location) {
        var model = this;

        model.register = register;
        model.logout = logout;
        model.updateUserProfile = updateUserProfile;
        model.unregisterUserProfile = unregisterUserProfile;
        model.currentUser = currentUser;
        model.getMessageBycurrentUser = getMessageBycurrentUser;
        model.getNewMessageCount = getNewMessageCount;
        model.getReviewBycurrentUser = getReviewBycurrentUser;
        model.likeReview = likeReview;
        model.deleteReview = deleteReview;
        model.islikedBycurrentUser = islikedBycurrentUser;
        model.isNotlikedBycurrentUser = isNotlikedBycurrentUser;
        model.isDislikedBycurrentUser = isDislikedBycurrentUser;
        model.isNotDislikedBycurrentUser = isNotDislikedBycurrentUser;
        model.dislikeReview = dislikeReview;
        model.iswrittenByCurrentUser = iswrittenByCurrentUser;
        model.reload = reload;


        function Init() {
            getMessageBycurrentUser();
            getReviewBycurrentUser();
            model.userId = currentUser._id;


        }

        Init();


        function reload() {
            $route.reload();

        }


        function deleteReview(review) {

            /*console.log("delete review controller");*/
            reviewService.deleteReview(review)
                .then(function (result) {
                    $route.reload();
                    /*return result*/
                });

        }

        function iswrittenByCurrentUser(review) {

            if (review.reviewerId === currentUser._id) {
                return "Yes"
            }
            else {
                return null;
            }

        }


        function isDislikedBycurrentUser(review) {

            if (review.DislikedBy.indexOf(currentUser._id) > -1) {
                return "Yes"

            }
            else {
                return null;

            }

        }


        function isNotDislikedBycurrentUser(review) {

            if (review.DislikedBy.indexOf(currentUser._id) > -1) {
                return null

            }
            else {
                return "Yes";

            }

        }


        function islikedBycurrentUser(review) {

            if (review.LikedBy.indexOf(currentUser._id) > -1) {
                return "Yes"

            }
            else {
                return null;

            }

        }


        function isNotlikedBycurrentUser(review) {

            if (review.LikedBy.indexOf(currentUser._id) > -1) {
                return null

            }
            else {
                return "Yes";

            }

        }


        function likeReview(review) {


            if (review.LikedBy.indexOf(currentUser._id) > -1) {
                review.Likes = review.Likes - 1;
                var index = review.LikedBy.indexOf(currentUser._id);
                review.LikedBy.splice(index, 1);
                reviewService.likeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }
            else {
                review.Likes = review.Likes + 1;
                review.LikedBy.push(currentUser._id);
                reviewService.likeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }
        }


        function dislikeReview(review) {

            /*review.Dislikes = review.Dislikes + 1;*/


            if (review.DislikedBy.indexOf(currentUser._id) > -1) {
                review.Dislikes = review.Dislikes - 1;
                var index = review.DislikedBy.indexOf(currentUser._id);
                review.DislikedBy.splice(index, 1);
                reviewService.dislikeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }
            else {
                review.Dislikes = review.Dislikes + 1;
                review.DislikedBy.push(currentUser._id);
                reviewService.dislikeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }
        }


        function getReviewBycurrentUser() {
            reviewService.getReviewBycurrentUser(model.currentUser)
                .then(function (resultReview) {
                    model.reviews = resultReview.data;
                    /*console.log("review for this user are here",model.reviews);*/
                });
        }


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
            if (currentUser) {

                messageService.getMessageBycurrentUser(model.currentUser)
                    .then(function (result) {
                        model.allMessages = result.data;
                        model.getNewMessageCount(model.allMessages);
                        /*console.log("This all Messages for user", model.allMessages)*/
                    }, function (error) {
                        console.log(error)
                    });

            }

        }


        function unregisterUserProfile() {

            userService
                .unregisterUserProfile()
                .then(function () {
                    $location.url('/');
                })

        }


        function updateUserProfile(userProfile) {
            model.submitted = true;
            userService
                .updateUserProfile(model.userId, userProfile)
                .then(function () {
                        model.message = "User update was successful.";
                    },
                    function () {

                        model.err = "Cannot Update User";
                    });
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })
        }


        function register(firstname, lastname, username, password, password2, email) {
            model.usernamemessage = "";
            model.passwordmessage = "";
            model.error = "";

            if (!username && !password && !password2) {
                model.error = "Incomplete Fields , Cannot Register";
                model.passwordmessage = "Password is Required";
                model.usernamemessage = "Username is Required";
                return;
            }

            if (!username) {
                model.error = "Incomplete Fields , Cannot Register";
                model.usernamemessage = "Username is Required";
                return;
            }

            if (!password || !password2) {
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
                    /*console.log("this user can be registered");*/
                    var userNew = {
                        username: username,
                        password: password
                    };

                    return userService
                        .register(userNew);
                })
                .then(function (user) {
                    /*console.log("after register done",user);*/
                    $location.url('/');
                });
        }

    }

})();