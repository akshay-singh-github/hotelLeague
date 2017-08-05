/**
 * Created by XA on 03-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("hotelDetailsController", hotelDetailsController);

    function hotelDetailsController($route, $location,$sce, userService,bookingService,hotelService,reviewService, currentUser,googleService,$routeParams) {
        var model = this;

        model.currentUser = currentUser;
        model.getHotelDetails = getHotelDetails;
        model.getApiKey = getApiKey;
        model.logout = logout;
        model.currentUser = currentUser;
        model.createBooking = createBooking;
        model.createReview = createReview;
        model.getReviewBycurrentHotel = getReviewBycurrentHotel;
        model.urlContentTrusting = urlContentTrusting;
        model.likeReview = likeReview;
        model.islikedBycurrentUser = islikedBycurrentUser;
        model.isNotlikedBycurrentUser = isNotlikedBycurrentUser;
        model.isDislikedBycurrentUser = isDislikedBycurrentUser;
        model.isNotDislikedBycurrentUser = isNotDislikedBycurrentUser;
        model.dislikeReview = dislikeReview;






        function init(){
            model.hotelId = $routeParams.hotelId;
            model.getApiKey();
            console.log("this is the google api key",model.googleApiKey);
            model.getHotelDetails(model.hotelId);
            getReviewBycurrentHotel(model.hotelId);

        }
        init();








        function isDislikedBycurrentUser(review) {

            if(review.DislikedBy.indexOf(currentUser._id)>-1){
                return "Yes"

            }
            else{
                return null;

            }

        }

        function isNotDislikedBycurrentUser(review) {

            if(review.DislikedBy.indexOf(currentUser._id)>-1){
                return null

            }
            else{
                return "Yes";

            }

        }





        function islikedBycurrentUser(review) {

            if(review.LikedBy.indexOf(currentUser._id)>-1){
                return "Yes"

            }
            else{
                return null;

            }

        }

        function isNotlikedBycurrentUser(review) {

            if(review.LikedBy.indexOf(currentUser._id)>-1){
                return null

            }
            else{
                return "Yes";

            }

        }



        

        function likeReview(review) {


            if(review.LikedBy.indexOf(currentUser._id)>-1){
                review.Likes = review.Likes - 1;
                var index = review.LikedBy.indexOf(currentUser._id);
                review.LikedBy.splice(index, 1);
                reviewService.likeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }
            else{
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



            if(review.DislikedBy.indexOf(currentUser._id)>-1){
                review.Dislikes = review.Dislikes - 1;
                var index = review.DislikedBy.indexOf(currentUser._id);
                review.DislikedBy.splice(index, 1);
                reviewService.dislikeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }
            else{
                review.Dislikes = review.Dislikes + 1;
                review.DislikedBy.push(currentUser._id);
                reviewService.dislikeReview(review)
                    .then(function (result) {
                        return result;
                    });

            }












            
        }
        

        
        
        function urlContentTrusting(url) {
            return $sce.trustAsResourceUrl(url);
        }


        function getReviewBycurrentHotel(hotelId) {
            reviewService.getReviewBycurrentHotel(hotelId)
                .then(function (resultReview) {
                    model.reviews = resultReview.data;
                    console.log("review for this hotel are here",model.reviews);
                });




        }


        
        function createReview(reviewObject) {

            model.Reviewerror = "";
            model.ReviewsuccessMessage = "";
            model.ReviewTitleMessage = "";
            model.Reviewsubmitted = true;
            model.messageReviewContent = "";

            if(!reviewObject){
                model.Reviewerror = "Review could not be posted. Please fill all the details and try again.";
            }
            else if(reviewObject && (!reviewObject.ReviewTitle)){
                model.Reviewerror = "Review could not be posted. Please fill all the details and try again.";
                model.ReviewTitleMessage = "Please fill the review title field.";
            }
            else if(reviewObject && (!reviewObject.ReviewContent)){
                model.Reviewerror = "Review could not be posted. Please fill all the details and try again.";
                model.messageReviewContent = "Please fill the review content field.";
            }
            else{
                model.Reviewsubmitted = false;
                console.log("current user is : ",currentUser);
                reviewObject.reviewer = currentUser.username;
                reviewObject.reviewerId = currentUser._id;
                reviewObject.reviewFor = model.hotelId;
                userService.findUserByUsername(reviewObject.reviewer)
                    .then(function (result) {

                        if(!result){
                            model.Reviewerror = "This User does not exist.";
                        }
                        else {
                            model.ReviewsuccessMessage = "The review has been successfully posted.";
                            reviewService.createReview(reviewObject)
                                .then(function (result) {
                                    $route.reload();
                                    return result
                                });
                        }

                    }, function () {
                        model.Reviewerror = "This User does not exist.";
                    });




            }


        }
        
        function createBooking(bookingObject) {
            console.log("Inside booking controller create");
            console.log(bookingObject);
            model.successMessage = "";
            model.error = "";
            model.nameMessage = "";
            model.contactMessage = "";
            model.checkinMessage = "";
            model.checkoutMessage = "";
            model.MemberCountMessage = "";
            model.submitted = true;

            if(!bookingObject){
                model.error = "Booking could not be done. Please fill all the details and try again.";
            }
            else if(bookingObject && (!bookingObject.name || !bookingObject.surname)){
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.nameMessage = "Please enter all the Guest name fields.";
            }
            else if(bookingObject && (!bookingObject.email || !bookingObject.phone)){

                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.contactMessage = "Please enter all the Guest contact fields.";

            }
            else if(bookingObject && (!bookingObject.checkinDate || !bookingObject.checkinMonth || !bookingObject.checkinYear)){
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.checkinMessage = "Please enter all the Hotel Check-in fields.";
            }
            else if(bookingObject && (!bookingObject.checkoutDate || !bookingObject.checkoutMonth || !bookingObject.checkoutYear)){
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.checkoutMessage = "Please enter all the Hotel Check-out fields.";
            }
            else if(bookingObject && (!bookingObject.MemberCount)){
                model.error = "Booking could not be done. Please fill all the details and try again.";
                model.MemberCountMessage = "Please enter the number of guests.";
            }
            else{

                model.submitted = false;
                bookingObject.forUser = currentUser.username;
                userService.findUserByUsername(bookingObject.forUser)
                    .then(function (result) {
                        if(!result || typeof result === "undefined"){
                            model.error = "This User does not exist.";
                        }
                        else{

                            if(parseInt(bookingObject.checkoutYear) > parseInt(bookingObject.checkinYear)){


                                        model.successMessage = "Booking has been done Successfully!!!.";
                                        bookingObject.forUserId = result._id;
                                        bookingService
                                            .createBooking(bookingObject)
                                            .then(function (result) {
                                                return result.data;
                                            });

                            }
                            else if(parseInt(bookingObject.checkoutYear) === parseInt(bookingObject.checkinYear)){
                                if(parseInt(bookingObject.checkoutMonth) > parseInt(bookingObject.checkinMonth)){

                                    model.successMessage = "Booking has been done Successfully!!!.";
                                    bookingObject.forUserId = result._id;
                                    bookingService
                                        .createBooking(bookingObject)
                                        .then(function (result) {
                                            return result.data;
                                        });}


                                else if(parseInt(bookingObject.checkoutMonth) === parseInt(bookingObject.checkinMonth)){
                                    if(parseInt(bookingObject.checkoutDate) >= parseInt(bookingObject.checkinDate)){

                                        model.successMessage = "Booking has been done Successfully!!!.";
                                        bookingObject.forUserId = result._id;
                                        bookingService
                                            .createBooking(bookingObject)
                                            .then(function (result) {
                                                return result.data;
                                            });

                                    }
                                    else{
                                        model.error = "Booking could not be done. Please check the timings.";
                                    }

                                }
                                else{
                                    model.error = "Booking could not be done. Please check the timings.";
                                }

                            }
                            else{
                                model.error = "Booking could not be done. Please check the timings.";
                            }

                        }

                    },function () {
                        model.error = "This User does not exist.";
                    });

            }

            /*model.error="";
            model.successMessage = "";
            model.messageTo="";
            model.messageSubject = "";
            model.submitted = true;
            if(!messageObject){
                model.error = "Message could not be send. Please fill all the fields.";
            }

            else if(messageObject && !messageObject.forUser){
                model.error = "Message could not be send. Please fill all the fields.";
                model.messageTo = "Please enter the receiver's username.";
            }
            else if(messageObject && !messageObject.message_title){
                model.error = "Message could not be send. Please fill all the fields.";
                model.messageTo = "Please enter the subject for the message.";
            }
            else{
                model.submitted = false;

                userService.findUserByUsername(messageObject.forUser)
                    .then(function (result) {
                        console.log("this is the user message to be sent");
                        if(!result || typeof result === "undefined"){
                            model.error = "This User does not exist.";
                        }
                        else{
                            model.successMessage = "Message has been sent Successfully!!!.";
                            messageObject.forUserId = result._id;
                            messageObject.from = model.currentUser.username;
                            messageService
                                .createMessage(messageObject)
                                .then(function (result) {
                                    return result.data;
                                });

                        }

                    },function () {
                        model.error = "This User does not exist.";
                    });

            }*/





            
        }
        
        

        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })

        }




        function getHotelDetails(hotelId) {
            hotelService.findHotelById(hotelId)
                .then(function (result) {
                    console.log(result);
                    console.log("result.data.length", result.data.length);
                    if (result.data.length !== 0){
                        console.log("result.data is NOT empty",result.data.length);
                         var arrayElement= result.data[0];
                        model.hotelObject = arrayElement;
                        console.log("model.hotelObject", model.hotelObject);

                        googleService.getApiKey()
                            .then(function (result) {
                                console.log("this is the google api key RESULT",result);
                                model.googleApiKey=result.key;
                                var newUrl = "https://www.google.com/maps/embed/v1/place?key="+model.googleApiKey+"&center="+model.hotelObject.hotelLatitude+","+model.hotelObject.hotelLongitude+"&zoom=18&maptype=roadmap&q="+model.hotelObject.hotelName+model.hotelObject.hotelAddress ;
                                model.mapUrlIframe = model.urlContentTrusting(newUrl);
                                console.log("model.mapUrlIframe", model.mapUrlIframe);
                            });
                        console.log("model.mapUrlIframe", model.mapUrlIframe);
                    }
                    else{
                        console.log("result.data is empty");
                        var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+hotelId;
                        var urlObject = {
                            url:url
                        };
                        googleService.getHotelDetails(urlObject)
                            .then(function (result) {
                                console.log(result.data);
                                model.hotelDetails = result.data;
                                model.hotelObject = {};
                                model.hotelObject.photoUrl = "https://maps.googleapis.com/maps/api/place/photo?photoreference="+model.hotelDetails.photos[0].photo_reference+"&sensor=false&maxheight="+model.hotelDetails.photos[0].height+"&maxwidth="+model.hotelDetails.photos[0].width+"&key="+model.googleApiKey;
                                console.log("model.hotelObject", model.hotelObject);
                                model.hotelObject.hotelID = model.hotelDetails.place_id;
                                model.hotelObject.hotelName = model.hotelDetails.name;
                                if(model.hotelDetails.opening_hours.open_now === true){
                                    model.hotelObject.openStatus = "Yes";
                                }else if(model.hotelDetails.opening_hours.open_now === false) {
                                    model.hotelObject.openStatus = "No";
                                }else{
                                    model.hotelObject.openStatus = "Unknown";
                                }
                                model.hotelObject.phoneNumber = model.hotelDetails.international_phone_number;
                                model.hotelObject.hotelAddress = model.hotelDetails.formatted_address;
                                model.hotelObject.weekHours = model.hotelDetails.opening_hours.weekday_text;
                                model.hotelObject.landmarkLocation =  model.hotelDetails.vicinity;
                                model.hotelObject.website = model.hotelDetails.website;
                                model.hotelObject.mapDetailsUrl = model.hotelDetails.url;
                                model.hotelObject.hotelCategory = model.hotelDetails.types; //[String]
                                model.hotelObject.hotelRating = model.hotelDetails.rating;
                                model.hotelObject.hotelLatitude = model.hotelDetails.geometry.location.lat;
                                model.hotelObject.hotelLongitude = model.hotelDetails.geometry.location.lng;
                                googleService.getApiKey()
                                    .then(function (result) {
                                        console.log("this is the google api key RESULT",result);
                                        model.googleApiKey=result.key;
                                        var newUrl = "https://www.google.com/maps/embed/v1/view?key="+model.googleApiKey+"&center="+model.hotelObject.hotelLatitude+","+model.hotelObject.hotelLongitude+"&zoom=18&maptype=satellite" ;
                                        model.mapUrlIframe = model.urlContentTrusting(newUrl);
                                        console.log("model.mapUrlIframe", model.mapUrlIframe);
                                        hotelService.createHotel(model.hotelObject)
                                            .then(function (result) {
                                                return result.data;
                                            });
                                    });


                            });
                    }
                });
        }






        function getApiKey() {
            googleService.getApiKey()
                .then(function (result) {
                    console.log("this is the google api key RESULT",result);
                    model.googleApiKey=result.key;
                });
        }



    }

})();
