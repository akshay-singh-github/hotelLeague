/**
 * Created by XA on 03-Jul-17.
 */
var https = require('https');
module.exports=function (app) {

    app.post("/api/login" , login);


    function login(req, res) {

        var userObject = req.body;
        console.log(userObject);
        res.send(userObject);

    }


};
