/**
 * Created by XA on 01-Jul-17.
 */

module.exports = function(app){

    var stringForConnection = 'mongodb://localhost/webdev_project'; // for local
    if (process.env.MLAB_USERNAME_WEBDEV_PROJECT){ // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV_PROJECT; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV_PROJECT;
        stringForConnection = 'mongodb://' + username + ':' + password;
        stringForConnection += '@ds157980.mlab.com:57980/heroku_6hzb1n5k'; // user yours
    }

    var mongoose = require('mongoose');
    mongoose.connect(stringForConnection);
    mongoose.Promise = require('q').Promise;

    var model = require("./models/model_server")();

    require("./services/google.service.server.js")(app, model);
    require("./services/user.service.server.js")(app, model);
    require("./services/message.service.server.js")(app, model);
    require("./services/booking.service.server.js")(app, model);
    require("./services/review.service.server.js")(app, model);
    require("./services/hotel.service.server.js")(app, model);

    var userSchema = require('./models/user/user.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var userModelDummy = mongoose.model('userModelDummy', userSchema);

    function init(model) {
        var dumUsers = require("./intial.users.json");

        for (var i in dumUsers) {
            dumUsers[i].password = bcrypt.hashSync(dumUsers[i].password);


            var query = {username: dumUsers[i].username};
            var update = { $set:dumUsers[i] };
            var options = { upsert: true, new: true, setDefaultsOnInsert: true };


            userModelDummy.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return error;
            });
        }
    }

    init();

};