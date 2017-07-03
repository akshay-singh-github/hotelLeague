/**
 * Created by XA on 02-Jul-17.
 */
var https = require('https');
module.exports=function (app) {

    app.post("/api/hotel/search" , findNearbyHotels);
    app.get("/api/google/apiKey" , getApiKey);
    
    

    function getApiKey(req, res) {

        res.json({key:"AIzaSyA2Bhea9SgEMLUpWGOHViSBv8iEpYQky9Y"});

    }



    
    
    function findNearbyHotels(req, res) {
        var urlObject = req.body;
        var url = urlObject.url;
        var completeUrl = url+"&key=AIzaSyA2Bhea9SgEMLUpWGOHViSBv8iEpYQky9Y";


        console.log(completeUrl);
        https.get(completeUrl, function(response) {
            var body ='';
            response.on('data', function(chunk) {
                body += chunk;

            });

            response.on('end', function() {
                var places = JSON.parse(body);
                var locations = places.results;
                res.send(locations);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    }
    

};
