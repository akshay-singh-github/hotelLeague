/**
 * Created by XA on 06-Jul-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("messageInboxController", messageInboxController);

    function messageInboxController($route, currentUser, userService, $location, messageService) {
        var model = this;

        model.login = login;
        model.logout = logout;
        model.searchUser = searchUser;
        model.showUserDetails = showUserDetails;
        model.showMessageDetails = showMessageDetails;
        model.createMessage = createMessage;
        model.getMessageBycurrentUser = getMessageBycurrentUser;
        model.reloadPage = reloadPage;
        model.messageOpen = messageOpen;
        model.deleteMessage = deleteMessage;
        model.replyMessage = replyMessage;
        /*model.findMessageByReceiverId = findMessageByReceiverId;
        model.deleteMessage = deleteMessage;*/
        model.currentUser = currentUser;



        function init() {
            getMessageBycurrentUser();
            model.showUserDetailsFlag = false;
            model.showMessageDetailsFlag = false;
        }
        init();
        
        function replyMessage(message_body, message) {
            var replyObject = {};
            replyObject.message_body = message_body;

            console.log("initial Reply message", replyObject);
            console.log("initial message message", message);
            replyObject.forUser = message.from;
            userService.findUserByUsername(replyObject.forUser)
                .then(function (result) {
                    replyObject.forUserId = result._id;
                    replyObject.from = currentUser.username;
                    replyObject.date = new Date();
                    replyObject.message_title = message.message_title;
                    replyObject.isMessageNew = 'NEW';
                    console.log("final Reply message", replyObject);
                    model.createMessage(replyObject);
                    $route.reload();

                });



        }
        
        function deleteMessage(message) {
            messageService.deleteMessage(message)
                .then(function (result) {
                    console.log("Delete Message", result.data);
                    $route.reload();
                    return result.data;

                });
            
        }


        function reloadPage() {
            $route.reload();
        }

        function getMessageBycurrentUser() {
            messageService.getMessageBycurrentUser()
                .then(function (result) {
                    model.allMessages = result.data;
                    console.log("This all Messages for user", model.allMessages)
                });
        }



        function messageOpen(message) {
            message.isMessageNew = 'OLD';
            message.dateRead = new Date();
            messageService.updateMessage(message)
                .then(function (result) {
                    console.log("Message Open", result.data);
                    return result.data;

                });

        }




        function createMessage(messageObject) {
            model.error="";
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

            }
        }




        function showMessageDetails(message) {
            model.showMessageDetailsFlag = true;
            model.thisMessageTitle = message.message_title;
            model.thisMessageBody = message.message_body;
            model.thisFrom = message.from;



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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
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













            /*userService.login(username, password)
             .then(function (result) {
             console.log("This is user", result);
             });*/
        }






    }

})();
