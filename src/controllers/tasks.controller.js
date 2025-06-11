//initialisation d'un tableau vide pour stocker les tâches
const Task = require('../models/task.model');

module.exports = {
    //fonction asynchrone pour créer une tâche
    CreateTask: async (req, res) => {
        //Extraction des données de la requête
        const { title, content } = req.body;
        try {
            //création d'un nouvel objet tâche avec le titre et le contenu fournis
            const newTask = new Task({ title, content});
            await newTask.save();
            //réponse avec le statut 201 (Created) pour indiquer que la tâche a été créée avec succès
            return res.status(201).send({
                message: 'Task created successfully',
            });
        } catch (error) {
            //en cas d'erreur, renvoi d'une erreur 500 (Internal Server Error)
            return res.status(500).json({ error: 'An error occurred while creating the task' });
        }

        },


    //fonction pour récupérer toutes les tâches
     GetAllTasks: async (req, res) => {
        try {
            //renvoi de la liste des tâches avec le statut 200 (OK)
            const tasks =  await Task.find();
            return res.status(200).json(tasks);
        } catch (error) {
            //en cas d'erreur, renvoi d'une erreur 500 (Internal Server Error)
            return res.status(500).json({ error: 'An error occurred while retrieving tasks' });
        }
    },

    //fonction pour récupérer une tâche par son ID
    GetTaskById: async (req, res) => {
        const { id } = req.params;

        try {
            //Recherche de la tâche par son ID
            const task = await Task.findById(id);
            if (!task) {
                //Si la tâche n'est pas trouvée, renvoi d'une erreur 404 (Not Found)
                return res.status(404).json({ error: 'Task not found' });
            }
            //Si la tâche est trouvée, renvoi de la tâche avec le statut 200 (OK)
            return res.status(200).json(task);
        } catch (error) {
            //En cas d'erreur, renvoi d'une erreur 500 (Internal Server Error)
            return res.status(500).json({ error: 'An error occurred while retrieving the task' });
        }
    },


    //fonction pour modifier une tâche par son ID
    UpdateTask: async (req, res) => {
        const { id } = req.params;
        const { title, content, completed } = req.body;

        try {
            //Recherche de la tâche par son ID
            const task = await Task.findById(id);
            if (!task) {
                //Si la tâche n'est pas trouvée, renvoi d'une erreur 404 (Not Found)
                return res.status(404).json({ error: 'Task not found' });
            }

            //Mise à jour des champs de la tâche
            if (title) task.title = title;
            if (content) task.content = content;
            if (completed !== undefined) task.completed = completed;

            //Enregistrement des modifications
            await task.save();
            //Renvoi de la tâche mise à jour avec le statut 200 (OK)
            return res.status(200).json(task);
        } catch (error) {
            //En cas d'erreur, renvoi d'une erreur 500 (Internal Server Error)
            return res.status(500).json({ error: 'An error occurred while updating the task' });
        }
    },


    DeleteTask: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedTask = await Task.findByIdAndDelete(id);

            if (!deletedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }

            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            // Gestion spécifique du CastError (ID mal formé)
            if (error.name === 'CastError') {
                return res.status(400).json({ error: 'Invalid task ID format' });
            }

            return res.status(500).json({ error: 'An error occurred while deleting the task' });
        }
    }



}