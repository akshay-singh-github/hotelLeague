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
            });

    }






})();