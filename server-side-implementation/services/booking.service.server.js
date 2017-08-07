/**
 * Created by XA on 31-Jul-17.
 */

var https = require('https');
module.exports=function (app,model) {

    app.get("/api/getFavoriteBooking" , findFavoriteBookingByUserId);
    app.get("/api/getBooking" , findBookingByUserId);
    app.post("/api/createBooking" , createBooking);

    
    
    
    
    function findFavoriteBookingByUserId(req, res) {

        var uid = req.user._id;

        model.userModel.findUserById(uid)
            .then(function (user) {
                console.log("Fav bookings in user server", user);
                var favoriteBookings = user.favoriteHotelBooking;
                model.bookingModel
                    .findFavoriteBookingByUserId(favoriteBookings)
                    .then(function (bookings) {
                        console.log("Fav bookings in server", bookings);
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

            });
    }
        






    function createBooking(req, res) {
        console.log("Inside booking server create");
        var bookingObject = req.body;
        console.log("bookingObject : ", bookingObject);
        model.bookingModel
            .createBooking(bookingObject)
            .then(function (booking) {
                console.log("booking : ", booking);
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