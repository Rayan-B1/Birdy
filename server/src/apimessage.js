const express = require("express");
const Messages = require("./entities/messages.js");
const router = express();
var dataStore = require('nedb');

function init(db){

    router.use(express.json()); 

    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    db = {}
    db.messages = new dataStore("./src/messages.db");
    db.messages.loadDatabase();

    const messages = new Messages.default(db);


    router.post("/messages/:userid",async (req, res) => {
        const {Login, messagetopublish, dateofpublication, imageBase64} = req.body;
        const TweetsNumber = await messages.getListMessageUser(Login)
        await messages.createMessage( Login, messagetopublish, dateofpublication, imageBase64,TweetsNumber )
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err));
                
        });

        router
        .route("/messages")
        .get(async (req, res)=>{
            try {
                const mesMessages = await messages.getListMessage();
                if (!mesMessages)
                    res.sendStatus(404); 
                else
                    res.send(mesMessages);
            }
            catch (e) {
                res.status(500).send(e);
            }
        });    

    router
    .route("/messages/:userid")
    .get(async (req, res)=>{
        try {
            const mesMessages = await messages.getListMessageUser(req.params.userid);
            
            if (!mesMessages)
                res.sendStatus(404); /*si user non existant */
            else
                res.send(mesMessages);
        }
        catch (e) {
            res.status(500).send(e);
        }
    });    

    router
    .route("/messages/:userid")
    .delete(async (req, res)=>{
        const {messageid} = req.body;
        console.log(req.params.userid,req.body)
        messages.deleteMessage(req.params.userid, messageid)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err));
    });

    router
    .route("/messages/:userid")
    .put(async (req, res)=>{
        const {messageid, messagetopublish, dateofpublication} = req.body;
        messages.setMessage(req.params.userid, messageid, messagetopublish, dateofpublication)
        .then((data) => res.status(201).send(data))
        .catch((err) => res.status(500).send(err));
    });

    router
    .route("/MostTweeted")    
    .get(async (req, res)=>{

            try {
                const person = await messages.getPersonMostTweeted();
                console.dir(person)
                if (!person)
                    res.sendStatus(404); /*si user non existant */
                else
                    res.send(person);
            }
            catch (e) {
                res.status(500).send(e);
            }
        }); 

    return router;

}

exports.default = init; 