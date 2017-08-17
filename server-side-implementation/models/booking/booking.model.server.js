/**
 * Created by XA on 31-Jul-17.
 */

module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var bookingSchema = require('./booking.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var bookingModel = mongoose.model('bookingModel', bookingSchema);

    var api = {

        createBooking: createBooking,
        findBookingByUserId: findBookingByUserId,
        deleteBooking: deleteBooking,
        findFavoriteBookingByUserId: findFavoriteBookingByUserId,
        getAllBookings: getAllBookings,
        updateBooking: updateBooking,
        setModel: setModel
    };

    return api;


    function updateBooking(bookingID, booking) {
        /*console.log("booking in the model", booking);*/

        return bookingModel.update({_id: bookingID}, {$set: booking});

    }


    function setModel(_model) {
        model = _model;
    }


    function getAllBookings() {
        return bookingModel.find().sort({date: -1});
    }


    function findFavoriteBookingByUserId(favbookingIdArray) {

        return bookingModel.find({'_id': {$in: favbookingIdArray}}).sort({date: -1}).populate('hotel').exec();

    }


    function deleteBooking(bookingId) {
        return bookingModel.remove({_id: bookingId});
    }


    function createBooking(booking) {

        return bookingModel.create(booking);
    }


    function findBookingByUserId(uid) {
        return bookingModel.find({forUserId: uid}).sort({date: -1}).populate('hotel').exec();
    }


};