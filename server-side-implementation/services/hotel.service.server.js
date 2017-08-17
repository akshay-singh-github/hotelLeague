/**
 * Created by XA on 02-Aug-17.
 */

var https = require('https');
module.exports = function (app, model) {

    app.get("/api/getHotel/:hotId", findHotelById);
    app.post("/api/createHotel", createHotel);


    function createHotel(req, res) {
        /*console.log("Inside hotel server create");*/
        var hotelObject = req.body;
        /*console.log("hotelObject : ", hotelObject);*/
        model.hotelModel
            .createHotel(hotelObject)
            .then(function (hotel) {
                /*console.log("hotel : ", hotel);*/
                res.json(hotel);
            }, function (error) {
                res.json(error);
            });
    }


    function findHotelById(req, res) {
        var hotId = req.params.hotId;

        model.hotelModel
            .findHotelById(hotId)
            .then(function (hotel) {
                if (hotel) {
                    /*console.log("sending hotel...",hotel);*/
                    res.json(hotel);
                }
                else {
                    res.sendStatus(404);
                }

            }, function () {
                res.sendStatus(404);
            });
    }


};