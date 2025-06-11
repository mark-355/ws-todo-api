//import de la bibliothèque mongoose pour interagir avec MongoDB

const mongoose = require('mongoose');

// Définition du schéma pour les tâches
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Le titre est requis
    },
    content: {
        type: String,
        required: true, // Le contenu est requis
    },
    createdAt: {
        type: Date,
        default: Date.now, // Date de création par défaut à la date actuelle
    },
    completed: {
        type: Boolean,
        default: false, // Par défaut, la tâche n'est pas terminée
    },
});

//création du modèle Task à partir du schéma
const Task = mongoose.model('Task', taskSchema);
//exporte le modèle Task pour l'utiliser dans d'autres fichiers
module.exports = Task;