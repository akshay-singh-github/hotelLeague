/**
 * Created by XA on 26-Jul-17.
 */

var https = require('https');
module.exports=function (app,model) {

    app.get("/api/getMessages/:currentUserId" , findMessagesByUserId);
    app.post("/api/createMessage" , createMessage);
    app.put("/api/updateMessage" , updateMessage);
    app.delete('/api/deleteMessage/:messageId', deleteMessage);
    
    



    function deleteMessage(req, res) {

        var msgId = req.params.messageId;
        model.messageModel.deleteMessage(msgId)
            .then(function (result) {
                res.send(result);
            });

    }








    function updateMessage(req, res) {

        var messageObject  = req.body;

        model.messageModel
            .updateMessage(messageObject)
            .then(function (message) {
                res.json(message);
            });


    }


    
    
    function createMessage(req, res) {
        var messageObject = req.body;
        model.messageModel
            .createMessage(messageObject)
            .then(function (message) {
                res.json(message);
            });
    }




    function findMessagesByUserId(req, res) {

            var uid = req.params.currentUserId;

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