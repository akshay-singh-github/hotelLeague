/**
 * Created by XA on 03-Jul-17.
 */

module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var hotelSchema = require('./hotel.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var hotelModel = mongoose.model('hotelModel', hotelSchema);

    var api = {

        createHotel: createHotel,
        findHotelById: findHotelById,
        deleteHotel: deleteHotel,
        setModel: setModel
    };

    return api;


    function setModel(_model) {
        model = _model;
    }

    function deleteHotel(hotId) {
        return hotelModel.remove({hotelID: hotId});
    }


    function createHotel(hotel) {

        return hotelModel.create(hotel);
    }


    function findHotelById(hotId) {
        return hotelModel.find({hotelID: hotId});
    }


};