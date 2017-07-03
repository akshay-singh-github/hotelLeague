/**
 * Created by XA on 01-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .config(hotelLeagueConfiguration);

    function hotelLeagueConfiguration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl:'views/home/templates/home.view.client.html',
                controller: "homeController",
                controllerAs: "model"
                /*resolve:{
                    currentUser: checkCurrentUser
                }*/
            })
            .when('/details/:hotelId', {
                templateUrl:'views/hotelDetails/templates/hotel-details.view.client.html',
                controller: "hotelDetailsController",
                controllerAs: "model"
                /*resolve:{
                 currentUser: checkCurrentUser
                 }*/
            });

    }






})();