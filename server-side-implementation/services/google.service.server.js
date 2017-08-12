/**
 * Created by XA on 02-Jul-17.
 */
var https = require('https');
module.exports=function (app,model) {

    app.post("/api/hotel/search" , findNearbyHotels);
    app.post("/api/hotel/details" , getHotelDetails);
    app.get("/api/google/apiKey" , getApiKey);
    
    var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;


    function getApiKey(req, res) {

        res.json({key:GOOGLE_API_KEY});

    }


    function getHotelDetails(req, res) {
        var urlObject = req.body;
        var url = urlObject.url;
        var completeUrl = url+"&key="+GOOGLE_API_KEY;

        console.log(completeUrl);
        https.get(completeUrl, function(response) {
            var body ='';
            response.on('data', function(chunk) {
                body += chunk;

            });

            response.on('end', function() {
                var placeDetail = JSON.parse(body);
                var details = placeDetail.result;
                /*console.log(details);*/
                res.send(details);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

    }
    
    
    function findNearbyHotels(req, res) {
        var urlObject = req.body;
        var url = urlObject.url;
        var completeUrl = url+"&key="+GOOGLE_API_KEY;


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
