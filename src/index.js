require('dotenv').config(); // Importation du module dotenv pour charger les variables d'environnement

//importation du module express
const express = require('express')

//importation du module mongoose pour la connexion à MongoDB
const mongoose = require('mongoose')

//création de l'instance de l'application express
const app = express()

//configuration du port d'écoute de l'application
const port = 3000

//Middleware pour parser le corps des requêtes en JSON
app.use(express.json())

//toutes les requêtes commençait par 'api/tasks' seront dirigées vers le fichier 'tasks.routes.js'
app.use('/api/tasks', require('./routes/tasks.routes.js'))


//définition d'une route de base
//lorsque l'utilisateur accède à la racine de l'application, il reçoit une réponse "Hello World!"
app.get('/', (req, res) => {
    res.send('Hello World!')
})




//connexion à la base de données MongoDB avec les informations d'authentification de l'environnement
mongoose
    .connect("mongodb://" + process.env.MONGO_HOST+ ":" +process.env.MONGO_PORT+ "/" +process.env.MONGO_DATABASE_NAME, {
    })
    .then(() => {
        console.log('MongoDB connected successfully');
        //démarrage du serveur express sur le port défini
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

