/**
 * Created by XA on 03-Jul-17.
 */

module.exports=function (app, model) {

    var https = require('https');
    var passport  = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");


    passport.use(new LocalStrategy(localStrategyForProject));
    passport.serializeUser(serializeUserForProject);
    passport.deserializeUser(deserializeUserForProject);

    /*isUserAdmin
     isUserAdminOrCurrentUser
    * */


    app.post("/api/project/login" ,passport.authenticate('local') ,login);
    app.get("/api/user",findUserbyQueryParameter);
    app.get("/api/getAllUsers",getAllUsers);
    app.get("/api/user/:userId",findUserByUserId);
    app.get("/api/getAllfollowers/:userId",getAllfollowers);
    app.get("/api/getAllfollowing/:userId",getAllfollowing);
    app.get("/api/userRegex",findUserbyRegexQueryParameter);
    app.post('/api/register',register);
    app.post('/api/createUser',createUser);
    app.get('/api/checkLoggedInUser', checkLoggedInUser);
    app.get('/api/checkAdminUser', checkAdminUser);
    app.post('/api/logoutUser',logoutUser);
    app.put('/api/user/:uid',isAdminorCurrentUser , updateUserProfile);
    app.post('/api/unregisterUserProfile',unregisterUserProfile);
    app.delete("/api/deleteUserProfile/:userId", deleteUser);


    var ProjectFBconfig ={
        callbackURL : process.env.CALLBACK_URL_FB,
        clientID : process.env.ID_CLIENT_FB,
        clientSecret : process.env.SECRET_CLIENT_FB
    };
    var ProjectFacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new ProjectFacebookStrategy(ProjectFBconfig,projectFBstrategy ));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            failureRedirect: '/index.html#!/login',
            successRedirect: '/index.html#!/profile'}));




    var ProjectGPconfig={

        callbackURL: process.env.CALLBACK_URL_GP,
        clientID: process.env.ID_CLIENT_GP,
        clientSecret: process.env.SECRET_CLIENT_GP
    };

    var ProjectGPStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new ProjectGPStrategy(ProjectGPconfig, projectGPstrategy));


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',

        passport.authenticate('google', { failureRedirect: '/index.html#!/login' }), function(req, res) {
            res.redirect('/index.html#!/profile');
        });









    function projectGPstrategy(token, refreshToken, profile, done) {
        model.userModel.findUserByGoogleId(profile.id).then(
            function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var emailID = profile.emails[0].value;
                        var  emailIDarray= emailID.split("@");
                        var userGP = {
                            lastName:  profile.name.familyName,
                            firstName: profile.name.givenName,
                            emailId:     emailID,
                            username:  emailIDarray[0],
                            google: {
                                token: token,
                                id:    profile.id
                            }
                        };
                        return model.userModel.createUser(userGP);
                    }
                }, function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(function(user){
                    return done(null, user);
                }, function(err){
                    if (err) {
                        return done(err);
                    }
                });}



    function projectFBstrategy(token, refreshToken, profile, done) {
        model.userModel.findUserByFacebookId(profile.id).then(
            function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var displayNameArray =profile.displayName.split(" ");
                        var fbLastName = displayNameArray[(displayNameArray.length) - 1];
                        var fbFirstName = displayNameArray[0];

                        var newFaceBookUser = {
                            firstName: fbFirstName,
                            lastName:  fbLastName,
                            facebook: {
                                token: token,
                                id:    profile.id
                            },
                            username:  profile.displayName.replace(/\s+/g, '').toLowerCase()
                        };
                        return model.userModel.createUser(newFaceBookUser);
                    }
                }, function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                }, function(err){
                    if (err) {
                        return done(err);
                    }
                });}










    function getAllUsers(req, res) {
            model.userModel.findAllUser()
                .then(function (users) {
                    res.json(users);
                },function (error) {
                    res.json(error);
                });
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.userModel
            .deleteUserProfile(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.json(error)
            });

    }



    function getAllfollowing(req, res) {
        var userId = req.params.userId;
        model.userModel.getAllfollowing(userId)
            .then(function (users) {
                console.log(users);
                res.json(users);
            },function (error) {
                console.log(error);
                return error;
            });
    }


    function getAllfollowers(req, res) {
        var userId = req.params.userId;
        model.userModel.getAllfollowers(userId)
            .then(function (users) {
                console.log(users);
                res.json(users);
            },function (error) {
                console.log(error);
                return error;
            });

    }



    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        model.userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.json(error);
            });
    }



    function findUserbyRegexQueryParameter(req, res) {

        var username = req.query.username;

        model.userModel
            .findUserByRegexUsername(username)
            .then(function (users) {
                if (users)
                {
                    res.json(users);
                }
                else{
                    res.sendStatus(404);
                }

            },function () {
                res.sendStatus(404);
            });
    }





    function unregisterUserProfile(req, res) {
        model.userModel
            .deleteUserProfile(req.user._id)
            .then(function (user) {
                req.logOut();
                res.sendStatus(200);
            },function (error) {
                res.json(error);
            });
        
    }
    
    
    
    
    
    
    
    function updateUserProfile(req, res) {

        var user = req.body;
        var userid = req.params.uid;

        model
            .userModel
            .updateUserProfile(userid, user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(404);
            });

    }
    
    
    
    
    




    function isAdminorCurrentUser(req, res, next) {
        if(req.isAuthenticated() || (req.user.roles.indexOf('ADMIN')> -1 && req.isAuthenticated())){
            next();
        }else{
            res.sendStatus(401);
        }
    }
    
    
    
    
    
    
    
    
    
    function logoutUser(req, res) {

        req.logOut();
        res.sendStatus(200);

    }






    function isUserAdmin(req, res, next) {
        if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')> -1){
            next();
        }else{
            res.sendStatus(401);
        }
    }

    function isUserAdminOrCurrentUser(req, res, next) {
        if(req.isAuthenticated() || (req.user.roles.indexOf('ADMIN')> -1 && req.isAuthenticated())){
            next();
        }else{
            res.sendStatus(401);
        }
    }

    
    
    function checkAdminUser() {

        if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
            res.json(req.user);
        }else{
            res.send('0');
        }
        
    }
    
    
    


    function checkLoggedInUser(req , res) {

        res.send(req.isAuthenticated() ? req.user : '0');

    }




    function serializeUserForProject(user, done) {
        done(null, user);
    }


    function deserializeUserForProject(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategyForProject(username, password, done) {
        model.userModel
            .findUserByUsername(username, password)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password))
                    {
                        return done(null, user);
                    }
                    else{

                        return done(null, false);
                    }

                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }





    function createUser(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        model.userModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            });

    }







    
    function register(req, res) {
        var userObj = req.body;
        userObj.password = bcrypt.hashSync(userObj.password);
        model.userModel
            .createUser(userObj)
            .then(function (user) {
                req.login(user, function (status) {
                    if(status) {
                        res.status(400).send(status);
                    } else {
                        res.json(user);
                    }
                });
            })
    }
    

    
    function findUserbyQueryParameter(req, res) {
        var queryParameters = req.query;

        if(queryParameters.username && queryParameters.password){
            findUserByCredentials(req , res);
        }
        else if(queryParameters.username){
            findUserByUsername(req, res);

        }
        else{
            model.userModel
                .findAllUser()
                .then(function (users) {
                    res.json(users);
                })
        }
    }



    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        model.userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);

            },function (error) {
                res.sendStatus(404);
            });

    }


    function findUserByUsername(req, res) {
        var username = req.query.username;

        model.userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user)
                {
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }

            },function () {
                res.sendStatus(404);
            });

    }





    function login(req, res) {
        var userObject = req.body;
        console.log(userObject);
        res.json(userObject);

    }


};
