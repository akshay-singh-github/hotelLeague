/**
 * Created by XA on 28-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .factory("messageService",messageService);


    function messageService($http) {


        var api = {
            createMessage : createMessage,
            getMessageBycurrentUser : getMessageBycurrentUser,
            deleteMessage : deleteMessage


        };

        return api;


        function createMessage(messageObj) {

            var url = "/api/createMessage";
            return $http.post(url, messageObj)
                .then(function (response) {
                    return response;
                });
        }

        function getMessageBycurrentUser() {
            var url = "/api/getMessages";

            return $http.get(url)
                .then(function (response) {
                    return response;
                });
            
        }
        
        function deleteMessage() {
            
        }


    }


})();