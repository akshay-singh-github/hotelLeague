/**
 * Created by XA on 02-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .factory("googleService",googleService);
    
    
    function googleService($http) {


        var api = {
            searchNearbyHotels : searchNearbyHotels,
            getApiKey : getApiKey

        };

        return api;
        
        
        
        function searchNearbyHotels(searchUrlObject) {
            var url = "/api/hotel/search";

            return $http.post(url,searchUrlObject)
                .then(function (result) {
                    return result;
                }, function (err) {
                    console.log(err);
                });
        }

        function getApiKey() {
            var url = "/api/google/apiKey";

            return $http.get(url)
                .then(function (result) {
                    return result.data;
                }, function (err) {
                    console.log(err);
                });
        }
        
        
        
    }
    
    
})();