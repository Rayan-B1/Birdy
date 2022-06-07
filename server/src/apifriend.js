const express = require("express");
const Friends = require("./entities/friends.js");
const router = express();
var dataStore = require('nedb');

function init(db){

    router.use(express.json()); 

    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

   
    db.friends = new dataStore("./src/friends.db");
    db.friends.loadDatabase();

    const friends = new Friends.default(db);

    router.post("/user/:userid/friends",async (req, res) => {
        const {LoginFriend} = req.body;
        
        const Followings = await friends.getListFollowings(LoginFriend);
        await friends.createFriend(req.params.userid , LoginFriend , Followings )
        .then((data) => res.status(201).send({LoginFriend }))
        .catch((err) => res.status(500).send(err));
                
        });
    
        router
        .route("/MostFollowed")
        .get( async (req, res)=>{
            try {
                const MostFollowed = await friends.getMostFollowed();
                console.dir(MostFollowed[0].friend)
                if (!MostFollowed)
                    res.sendStatus(404);
                else
                    res.send(MostFollowed[0].friend);
            }
            catch (e) {
                res.status(500).send(e);
            }
        }); 

        router
        .route("/user/:user_id/friends")
        .get( async (req, res)=>{
            try {
                const myFriends = await friends.getListFriends(req.params.user_id);
                
                if (!myFriends)
                    res.sendStatus(404);
                else
                    res.send(myFriends);
            }
            catch (e) {
                res.status(500).send(e);
            }
        }); 

        router
        .route("/user/:friend_id/followings")
        .get( async (req, res)=>{
            try {

                const Followings = await friends.getListFollowings(req.params.friend_id);
                if (!Followings)
                    res.sendStatus(404);
                else
                    res.send(Followings);
            }
            catch (e) {
                res.status(500).send(e);
            }
        }); 

        router
        .route("/user/:user_id/friends")
        .delete( async (req, res)=>{
            const {LoginFriend} = req.body;
            
            friends.deleteFriend(req.params.user_id, LoginFriend)
            .then((data) => res.status(201).send(data))
            .catch((err) => res.status(500).send(err));
        });

    return router

}

exports.default = init; 