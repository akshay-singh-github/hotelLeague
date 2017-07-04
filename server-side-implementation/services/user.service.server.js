/**
 * Created by XA on 03-Jul-17.
 */

module.exports=function (app, model) {

    var https = require('https');
    var passport  = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post("/api/login" ,passport.authenticate('local') ,login);
    app.get("/api/user",findUserbyQueryParameter);
    app.post('/api/register',register);


    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
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


    function localStrategy(username, password, done) {
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
        res.send(userObject);

    }


};
