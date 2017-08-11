/**
 * Created by XA on 02-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("homeController", homeController);

    function homeController($route,$location, userService,currentUser, googleService,$scope, $localStorage, $sessionStorage, $window) {
        var model = this;

        /*model.currentUser = currentUser;*/

        model.searchNearbyHotels = searchNearbyHotels;
        model.getApiKey = getApiKey;
        model.logout = logout;
        model.currentUser = currentUser;
        model.gotoDetailsPage = gotoDetailsPage;
        model.gotoInfoPage = gotoInfoPage;
        model.cancelSearch = cancelSearch;

        function init(){
            model.getApiKey();
            get();
            /*model.hotels = $window.sessionStorage.getItem("hotels");
            console.log("session hotels", $window.sessionStorage.getItem("hotels"));*/
        }
        init();




        function cancelSearch() {
            $sessionStorage.hotelList ="";
            $sessionStorage.cityName ="";
            $route.reload();
        }




        function gotoDetailsPage(hotelList) {
            /*$localStorage.LocalMessage = hotelList;*/
            $sessionStorage.hotelList = hotelList;
            $sessionStorage.cityName = model.city;
            $location.url('/');

        }

        function gotoInfoPage(hotelList) {
            /*$localStorage.LocalMessage = hotelList;*/
            $sessionStorage.hotelList = hotelList;
            $sessionStorage.cityName = model.city;
            $location.url('/');

        }





        function get() {
            model.hotels = $sessionStorage.hotelList;
            model.city = $sessionStorage.cityName;
            /*$window.alert($localStorage.LocalMessage + "\n" + $sessionStorage.SessionMessage);*/
            $location.url('/');
        }

        
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })
            
        }
        
        
        
        
        

        function searchNearbyHotels(search) {
            console.log("search",search);
            if(search !== null && typeof search !== 'undefined'){
            var cityN = search;
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
                    $sessionStorage.hotelList = model.hotels;
                    $sessionStorage.cityName = search;
                    console.log(result.data);
                });
            }else{
                $sessionStorage.hotelList="";
                $route.reload();
                $window.alert("Enter the city name.");
            }

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