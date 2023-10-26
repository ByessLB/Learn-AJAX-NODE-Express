const express = require('express');
const jsonfile = require('jsonfile');
const cors = require('cors'); // installation de Cors() dans une constante
const bdd = require("./models/pool.js");

const app = express();
const port = 8089;




// MiddleWare
/*****************************************************************************/

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));// permet d'interpréter le html
// cela est relié au dossier public
app.use(cors());
/* CORS :
permet de transmettre les informations de son serveur.
dans cet exemple, nous appelons la page client.html installé sur un autre dossier
et lu par le biais du serveur laragon. Les informations s'affichent comme souhaité
par notre dossier actuel. */



// Json
/*****************************************************************************/

app.get('/', (req, res) =>
{
    res.json({nom: "TOMI", age:5})
})


app.get('/jsf', (req, res) =>
{
    jsonfile.readFile('datas.json', (err, data) =>
    {
        if (err) {throw err};
        res.json(data);
    })
})


// POST
/*****************************************************************************/

app.post('/datas', (req, res) =>
{
    console.log(req.body)
    res.json({message: 'ok'});
})


// Login
/*****************************************************************************/
app.post('/log', (req, res) =>
{
    bdd.log(req.body, (rep) =>
    {
        // console.log(req.body); 
        // console.log(typeof rep, rep)
        if (!rep) 
        {
            res.json({message: "Un problème est survenu."});
        }
        res.json({message:"C'est good!!!"});
    });
});




// Listener
/*****************************************************************************/

app.listen(port, () => console.log('Le serveur foncitonne sur le port : ' + port));