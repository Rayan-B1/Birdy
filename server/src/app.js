const path = require('path');
var cors = require('cors')
const fileUpload = require('express-fileupload');
// Détermine le répertoire de base
const db = {}
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
app.use(cors())
app.use(fileUpload());


apiuser = require("./apiuser.js");
apimessage = require("./apimessage.js")
apifriend = require("./apifriend.js")

/*rajouter apifreinds.js ... */
const session = require("express-session");
const { countReset } = require('console');
//const { default: apifriend } = require('./apifriend.js');

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/apiuser', apiuser.default(db));
app.use('/apimessage', apimessage.default(db));
app.use('/apifriend', apifriend.default(db));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

