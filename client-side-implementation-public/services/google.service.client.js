/**
 * Created by XA on 02-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .factory("googleService",googleService);
    
    
    function googleService($http) {


        var api = {
            searchNearbyHotels : searchNearbyHotels

        };

        return api;
        
        
        
        function searchNearbyHotels(search) {
            var url = "/api/hotel/search";

            return $http.get(url)
                .then(function (result) {
                    return result;
                });
        }
        
        
        
    }
    
    
})();