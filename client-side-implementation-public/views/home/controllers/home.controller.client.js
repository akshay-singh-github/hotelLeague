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
            var cityN = search.city;
            var replacedsearch = cityN.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");
            var processedSearch = replacedsearch.split(" ").join("+");
            console.log(processedSearch);
            var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+processedSearch+"&radius=500&type=restaurant";
            var urlObject = {
                url:url
            };
            googleService.searchNearbyHotels(urlObject)
                .then(function (result) {
                    model.hotels = result.data;
                    console.log(result.data);
                })

        }



    }

})();