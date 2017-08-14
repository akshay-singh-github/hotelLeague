/**
 * Created by XA on 02-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .controller("homeController", homeController);

    function homeController($route,$location,reviewService, messageService, userService,currentUser, googleService,$scope, $localStorage, $sessionStorage,$anchorScroll, $window) {
        var model = this;

        /*model.currentUser = currentUser;*/

        model.searchNearbyHotels = searchNearbyHotels;
        model.getApiKey = getApiKey;
        model.logout = logout;
        model.currentUser = currentUser;
        model.gotoDetailsPage = gotoDetailsPage;
        model.gotoInfoPage = gotoInfoPage;
        model.cancelSearch = cancelSearch;
        model.getMessageBycurrentUser = getMessageBycurrentUser;
        model.getNewMessageCount = getNewMessageCount;
        model.scrollToSearchResults = scrollToSearchResults;
        model.getReviewsofFollowing = getReviewsofFollowing;

        function init(){
            getReviewsofFollowing();
            getMessageBycurrentUser();
            model.getApiKey();
            get();
            /*model.myInterval = 3000;*/
            /*model.hotels = $window.sessionStorage.getItem("hotels");
            console.log("session hotels", $window.sessionStorage.getItem("hotels"));*/
        }
        init();






        function getReviewsofFollowing() {
            if(model.currentUser){
                reviewService.getReviewsofFollowing(model.currentUser)
                    .then(function (result) {
                        model.allReviewsOfFollowing = result;
                        console.log("model.allReviewsOfFollowing", model.allReviewsOfFollowing)
                    },function (error) {
                        console.log("This is the error",error);
                    });
            }
        }








        function getNewMessageCount(messageArray) {
            model.newMessageCountVar = 0;
            for(var i in messageArray){
                if (messageArray[i].isMessageNew === 'NEW'){
                    model.newMessageCountVar = model.newMessageCountVar + 1;
                }
            }

            console.log("model.newMessageCountVar",model.newMessageCountVar)

        }






        function getMessageBycurrentUser() {
            messageService.getMessageBycurrentUser(model.currentUser)
                .then(function (result) {
                    model.allMessages = result.data;
                    model.getNewMessageCount(model.allMessages);
                    console.log("This all Messages for user", model.allMessages)
                });
        }







        
        function scrollToSearchResults() {
            $anchorScroll('search_results');
        }
        

        

        function cancelSearch() {
            $sessionStorage.hotelList ="";
            $sessionStorage.cityName ="";
            $route.reload();
        }




        function gotoDetailsPage(hotelList, hotel) {
            /*$localStorage.LocalMessage = hotelList;*/
            $sessionStorage.hotelList = hotelList;
            $sessionStorage.cityName = model.city;
            $location.url('/details/'+hotel.place_id);

        }

        function gotoInfoPage(hotelList, hotel) {
            /*$localStorage.LocalMessage = hotelList;*/
            console.log("this is hotel object",hotel.place_id);
            $sessionStorage.hotelList = hotelList;
            $sessionStorage.cityName = model.city;
            $location.url('/information/'+hotel.place_id);

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
                    model.scrollToSearchResults();
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