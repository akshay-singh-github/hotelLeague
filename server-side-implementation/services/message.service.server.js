/**
 * Created by XA on 26-Jul-17.
 */

var https = require('https');
module.exports=function (app,model) {

    app.get("/api/getMessages" , findMessagesByUserId);
    app.post("/api/createMessage" , createMessage);
    
    
    
    
    
    
    function createMessage(req, res) {
        var messageObject = req.body;
        model.messageModel
            .createMessage(messageObject)
            .then(function (message) {
                res.json(message);
            });
    }




    function findMessagesByUserId(req, res) {
        var uid = req.user._id;

        model.messageModel
            .findMessageByReceiverId(uid)
            .then(function (messages) {
                if (messages)
                {
                    res.json(messages);
                }
                else{
                    res.sendStatus(404);
                }

            },function () {
                res.sendStatus(404);
            });
    }


};