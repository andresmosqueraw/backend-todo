const express = require('express');
const router = express.Router();
const dbConnection = require('./database/db');
const taskController = require('./controllers/taskController');
const usersController = require('./controllers/usersController');
const app = express();

app.use(express.json());

//ruta para obtener todas las tareas
router.get('/tasks', taskController.getTasks);

//ruta para obtener una tarea por su id
router.get('/tasks/:id', taskController.getTaskById);

//ruta para agregar una nueva tarea
router.post('/tasks', taskController.addTask);

//ruta para actualizar una tarea
router.put('/tasks/:id', taskController.updateTask);

//ruta para eliminar una tarea
router.patch('/tasks/:id', taskController.deleteTask);

//ruta para obtener todas las tareas de un usuario
router.get('/users/:id/tasks', taskController.getTasksByUserId);

//ruta para obtener todos los usuarios
router.get('/users', usersController.getUsers);

//ruta para obtener un usuario por su id
router.get('/users/:id', usersController.getUserById);

//ruta para agregar un nuevo usuario
router.post('/users', usersController.addUser);

//ruta para actualizar un usuario
router.put('/users/:id', usersController.updateUser);

//ruta para eliminar un usuario
router.delete('/users/:id', usersController.deleteUser);

router.patch('/tasks/:id/status', taskController.updateStatus);


module.exports = router;