/**
 * Created by XA on 01-Jul-17.
 */

module.exports = function(app){

    var stringForConnection = 'mongodb://localhost/webdev_project'; // for local
    if (process.env.MLAB_USERNAME_WEBDEV_PROJECT){ // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV_PROJECT; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV_PROJECT;
        stringForConnection = 'mongodb://' + username + ':' + password;
        stringForConnection += '@ds139801.mlab.com:39801/heroku_qs2c77d6'; // user yours
    }

    var mongoose = require('mongoose');
    mongoose.connect(stringForConnection);
    mongoose.Promise = require('q').Promise;

    var model = require("./models/model_server")();

    require("./services/google.service.server.js")(app, model);
    require("./services/user.service.server.js")(app, model);
    require("./services/message.service.server.js")(app, model);

};