/**
 * Created by XA on 30-Jun-17.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var session_fields = {
    secret: "This is a secret",
    resave: true,
    saveUninitialized:true

};

app.use(session(session_fields));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+"/client-side-implementation-public"));

require("./server-side-implementation/server_app.js")(app);
var port = process.env.PORT || 3000;
app.listen(port);