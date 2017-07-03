/**
 * Created by XA on 03-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("hotelDetailsController", hotelDetailsController);

    function hotelDetailsController(googleService,$routeParams) {
        var model = this;

        /*model.currentUser = currentUser;*/

        model.getHotelDetails = getHotelDetails;
        model.getApiKey = getApiKey;


        

        function init(){
            model.hotelId = $routeParams.hotelId;
            model.getHotelDetails(model.hotelId);
            model.getApiKey();
        }
        init();





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
                    console.log(model.googleApiKey);

                })
        }



    }

})();
