/**
 * Created by XA on 02-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("homeController", homeController);

    function homeController(googleService) {
        var model = this;
        /*model.currentUser = currentUser;*/

        model.searchNearbyHotels = searchNearbyHotels;


        function searchNearbyHotels(search) {
            console.log(search);
            googleService.searchNearbyHotels(search)
                .then(function (result) {
                    console.log(result);
                })

        }



    }

})();