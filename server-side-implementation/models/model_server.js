/**
 * Created by XA on 04-Jul-17.
 */
module.exports = function () {
    /*var mongoose = require('mongoose');
     mongoose.connect('mongodb://localhost/webdev_summer1_2017');*/

    var userModel = require("./user/user.model.server")();
    var messageModel = require("./message/message.model.server")();
    var bookingModel = require("./booking/booking.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var hotelModel = require("./hotel/hotel.model.server")();
    /*var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();*/

    var model = {
        userModel: userModel,
        messageModel: messageModel,
        bookingModel: bookingModel,
        reviewModel: reviewModel,
        hotelModel: hotelModel
        /*websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel*/
    };
    userModel.setModel(model);
    messageModel.setModel(model);
    bookingModel.setModel(model);
    reviewModel.setModel(model);
    hotelModel.setModel(model);
    /*websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);*/


    return model;
};