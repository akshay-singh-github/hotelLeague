/**
 * Created by XA on 31-Jul-17.
 */

var https = require('https');
module.exports = function (app, model) {

    app.get("/api/project/getFavoriteBooking", findFavoriteBookingByUserId);
    app.get("/api/project/getBooking", findBookingByUserId);
    app.get("/api/project/getAllBookings", getAllBookings);
    app.post("/api/project/createBooking", createBooking);
    app.put("/api/project/updateBooking", updateBooking);
    app.delete("/api/project/deleteBooking/:bookingId", deleteBooking);


    function deleteBooking(req, res) {
        var bookingId = req.params.bookingId;

        model.bookingModel.deleteBooking(bookingId)
            .then(function (result) {
                res.json(result);
            }, function (error) {
                res.json(error);
            });
    }


    function updateBooking(req, res) {
        var booking = req.body;
        /*console.log("booking",booking);*/
        model.bookingModel.updateBooking(booking._id, booking)
            .then(function (result) {
                res.json(result);
            }, function (error) {
                res.json(error);
            });

    }


    function getAllBookings(req, res) {

        model.bookingModel.getAllBookings()
            .then(function (bookings) {
                res.json(bookings);
            }, function (error) {
                res.json(error);
            });

    }


    function findFavoriteBookingByUserId(req, res) {

        var uid = req.user._id;

        model.userModel.findUserById(uid)
            .then(function (user) {
                /*console.log("Fav bookings in user server", user);*/
                var favoriteBookings = user.favoriteHotelBooking;
                model.bookingModel
                    .findFavoriteBookingByUserId(favoriteBookings)
                    .then(function (bookings) {
                        /*console.log("Fav bookings in server", bookings);*/
                        if (bookings) {
                            res.json(bookings);
                        }
                        else {
                            res.sendStatus(404);
                        }

                    }, function () {
                        res.sendStatus(404);
                    });

            });
    }


    function createBooking(req, res) {
        /*console.log("Inside booking server create");*/
        var bookingObject = req.body;
        /*console.log("bookingObject : ", bookingObject);*/
        model.bookingModel
            .createBooking(bookingObject)
            .then(function (booking) {
                /*console.log("booking : ", booking);*/
                res.json(booking);
            }, function (error) {
                res.json(error);
            });
    }


    function findBookingByUserId(req, res) {
        var uid = req.user._id;

        model.bookingModel
            .findBookingByUserId(uid)
            .then(function (bookings) {
                if (bookings) {
                    res.json(bookings);
                }
                else {
                    res.sendStatus(404);
                }

            }, function () {
                res.sendStatus(404);
            });
    }


};