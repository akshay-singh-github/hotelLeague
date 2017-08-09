/**
 * Created by XA on 03-Jul-17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var userModel = mongoose.model('userModel', userSchema);

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findAllUser: findAllUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserProfile: updateUserProfile,
        deleteUser: deleteUser,
        addWebsite : addWebsite,
        deleteWebsite : deleteWebsite,
        findUserByGoogleId : findUserByGoogleId,
        findUserByFacebookId : findUserByFacebookId,
        setModel: setModel,
        deleteUserProfile : deleteUserProfile,
        findUserByRegexUsername : findUserByRegexUsername,
        getAllfollowers : getAllfollowers,
        getAllfollowing : getAllfollowing
    };

    return api;


    function getAllfollowing(userId) {
        return userModel.find({'followedBy':{$in:[userId]}});
    }

    function getAllfollowers(userId) {

        return userModel.find({'following':{$in:[userId]}});

    }

    
    
    function findUserByRegexUsername(username) {
        return userModel.find({"username" : new RegExp(username, "i")});
        
    }
    
    
    
    




    function deleteUserProfile(userId) {
        return userModel.remove({_id: userId});
    }




    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }





    function findUserByGoogleId(googleId) {
        return userModel
            .findOne({'google.id': googleId});
    }



    function setModel(_model) {
        model = _model;
    }

    function deleteWebsite(userId,websiteId) {
        return userModel
            .findById(userId)
            .then(function (user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                return user.save();
            });
    }


    function addWebsite(userId, websiteId) {
        return userModel
            .findById(userId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }


    function createUser(user) {
        if (user.roles) {
            if (typeof user.roles === 'string' || user.roles instanceof String) {
                user.roles = user.roles.toUpperCase();
                user.roles = user.roles.split(',').filter(function (e) {
                    return String(e).trim();
                });
            }
        }
        else {
            user.roles = ['USER'];
        }
        return userModel.create(user);
    }



    function findUserById(userId) {
        return userModel.findById(userId);
    }



    function findAllUser() {
        return userModel.find();
    }



    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }



    function findUserByCredentials(username, password) {
        var newPassword = bcrypt.hashSync(password);
        return userModel.findOne({username:username , password: newPassword});
    }



    function updateUserProfile(userId, newUser) {

        if (newUser.roles) {
            if (typeof newUser.roles === 'string' || newUser.roles instanceof String) {
                newUser.roles = newUser.roles.toUpperCase();
                newUser.roles = newUser.roles.split(',').filter(function (e) {
                    return String(e).trim();
                });
            }
        }
        else {
            newUser.roles = ['USER'];
        }



        delete newUser.username; /*to avoid changing  username*/
        delete newUser.password; /*to avoid changing password*/
        return userModel.update({_id: userId},{$set: newUser});
    }



    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }

};







