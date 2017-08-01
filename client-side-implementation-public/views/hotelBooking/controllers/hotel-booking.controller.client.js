/**
 * Created by XA on 03-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("hotelDetailsController", hotelDetailsController);

    function hotelDetailsController($route, $location, userService,bookingService, currentUser,googleService,$routeParams) {
        var model = this;

        model.currentUser = currentUser;
        model.getHotelDetails = getHotelDetails;
        model.getApiKey = getApiKey;
        model.logout = logout;
        model.currentUser = currentUser;
        model.createBooking = createBooking;




        function init(){
            model.hotelId = $routeParams.hotelId;
            model.getHotelDetails(model.hotelId);
            model.getApiKey();
        }
        init();

        
        
        
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
            var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+hotelId;
            var urlObject = {
                url:url
            };
            googleService.getHotelDetails(urlObject)
                .then(function (result) {
                    model.hotelDetails = result.data;
                })

        }






        function getApiKey() {
            googleService.getApiKey()
                .then(function (result) {
                    model.googleApiKey=result.key;


                })
        }



    }

})();
