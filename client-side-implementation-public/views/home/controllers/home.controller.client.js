/**
 * Created by XA on 02-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("homeController", homeController);

    function homeController($route,$location, userService,currentUser, googleService) {
        var model = this;

        /*model.currentUser = currentUser;*/

        model.searchNearbyHotels = searchNearbyHotels;
        model.getApiKey = getApiKey;
        model.logout = logout;
        model.currentUser = currentUser;

        function init(){
            model.getApiKey();
        }
        init();
        
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })
            
        }
        
        
        
        
        

        function searchNearbyHotels(search) {
            var cityN = search.city;
            var replacedsearch = cityN.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");
            var processedSearch = replacedsearch.split(" ").join("+");
            console.log(processedSearch);
            var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+processedSearch+"&radius=500&type=lodging";
            var urlObject = {
                url:url
            };
            googleService.searchNearbyHotels(urlObject)
                .then(function (result) {
                    model.hotels = result.data;
                    console.log(result.data);
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