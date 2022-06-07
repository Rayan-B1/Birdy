
const express = require("express");
const Users = require("./entities/users.js");
const router = express();
var dataStore = require('nedb');

function init(db) {
    
    
    // On utilise JSON
    router.use(express.json()); 
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    
    db.users = new dataStore("./src/users.db");
    db.users.loadDatabase();

    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        
        try {
            const { Login, password } = req.body;
            // Erreur sur la requête HTTP
            /*if (!username || !password) {
                
                res.status(400).json({
                    status: 400,
                    message: "Requête invalide : login et password nécessaires"
                });


                return;
            }*/

            
            if(! await users.exists(Login)) {
                res.status(401).json({
                    status: 401,
                    message: "Login non existant"
                });
                return;
            }

            let userinfos = await users.checkpassword(Login, password);
            console.log(userinfos)
            if (userinfos) {
                //console.log("here now")
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        
                        req.session.userid = userinfos;
                        res.status(200).json({
                            status: 200,
                            //message: "Login et mot de passe accepté"
                            message: userinfos
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "mot de passe incorrect , veuillez réessayer"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    router.
    route("/user/:user_id/logout")
    .delete(async(req, res)  =>{
        req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "Déconnecté"
            });
            return;

    })

    router
        .route("/user/:user_id")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            
            if (!user)
                res.sendStatus(404); /*si user non existant */
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));




    

    router.post("/user", async(req, res) => {
        const {Nom, Prenom, Login, password, dateOfJoin } = req.body;
        /*if (!Nom || !Prenom || !Login || !password) {
            res.sendStatus(400)
            res.send("Missing fields")
            

        } else {*/
        
        if( await users.exists(Login) ) {
            res.status(401).json({
                status: 401,
                message: "Login existe deja"
            });

            
            return;
        }
       
        users.create(Nom, Prenom, Login, password, dateOfJoin)
        .then((user_id) => res.status(201).send({ id: user_id }))
        .catch((err) => res.status(500).send(err));
            
               
        //}
    });

    return router;
}
exports.default = init;

