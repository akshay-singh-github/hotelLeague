/**
 * Created by XA on 31-Jul-17.
 */

var https = require('https');
module.exports=function (app,model) {

    app.get("/api/getBooking" , findBookingByUserId);
    app.post("/api/createBooking" , createBooking);






    function createBooking(req, res) {
        var bookingObject = req.body;
        model.bookingModel
            .createBooking(bookingObject)
            .then(function (booking) {
                res.json(booking);
            });
    }




    function findBookingByUserId(req, res) {
        var uid = req.user._id;

        model.bookingModel
            .findBookingByUserId(uid)
            .then(function (bookings) {
                if (bookings)
                {
                    res.json(bookings);
                }
                else{
                    res.sendStatus(404);
                }

            },function () {
                res.sendStatus(404);
            });
    }


};