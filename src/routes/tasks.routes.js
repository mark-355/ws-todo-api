//importation du module express
const express = require('express');

//création d'une instance de router pour définir les routes
const router = express.Router();

//import le controller des tâches
const tasksController = require('../controllers/tasks.controller');

//importation du middleware pour vérifier les champs requis
const requiredFields = require('../middlewares/requiredFields.middleware');

//déifinition d'une route post pour la racine du router
router.post('/', requiredFields(["title", "content"]), tasksController.CreateTask);

//définition d'une route get pour la racine du router
router.get('/', tasksController.GetAllTasks);


router.get('/:id', tasksController.GetTaskById);

router.put('/:id', requiredFields(["title", "content", "completed"]), tasksController.UpdateTask);

router.delete('/:id', tasksController.DeleteTask);


//exportation du router pour l'utiliser dans d'autres fichiers

module.exports = router;