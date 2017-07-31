/**
 * Created by XA on 03-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("hotelDetailsController", hotelDetailsController);

    function hotelDetailsController($route, $location, userService, currentUser,googleService,$routeParams) {
        var model = this;

        /*model.currentUser = currentUser;*/

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

        
        
        
        function createBooking(customer) {

            console.log(customer);

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
