const express = require('express');
const dbConnection = require('../database/db'); // Asume que este módulo exporta correctamente tu conexión a la base de datos

const app = express();

//controlador para manejar la solicitud de obtener todas las tareas
// En el servidor de Node.js
function getTasks(req, res) {
    // Consulta que solo devuelve tareas con estado '1'
    const query = 'SELECT * FROM tasks WHERE estado = ?';
    
    dbConnection.query(query, ['1'], (err, rows) => {
      if (err) {
        console.log('Error al obtener las tareas: ', err);
        res.status(500).send('Error al obtener las tareas');
        return;
      }
      res.json(rows);
    });
  }
  
//controlador para cambiar el status de pending a completed y viceversa
function updateTaskStatus(req, res) {
    const taskId = req.params.id;
    const task = req.body;
    const query = 'UPDATE tasks SET status = ? WHERE task_id = ?';
    
    dbConnection.query(query, [task.status, taskId], (err, result) => {
        if (err) {
            console.log('Error al actualizar el estado de la tarea: ', err);
            res.status(500).send({ error: 'Error al actualizar el estado de la tarea' });
            return;
        }
        res.status(200).json({ message: 'Estado de la tarea actualizado correctamente' });
    });
}

//controlador para manejar la solicitud de obtener una tarea por su id
function getTaskById(req, res) {
    //obtener el id de la tarea de la solicitud
    const taskId = req.params.id;
    //consulta para obtener la tarea por su id
    const query = 'SELECT * FROM tasks WHERE task_id = ?';
    //ejecutar la consulta
    dbConnection.query(query, [taskId], (err, rows) => {
        if (err) {
            console.log('Error al obtener la tarea: ', err);
            res.status(500).send('Error al obtener la tarea');
            return;
        }
        res.json(rows);
    });
}

//controlador para agregar una nueva tarea
function addTask(req, res) {
    console.log(req.body);
    //obtener los datos de la solicitud
    const task = req.body;
    const userId = 2;
    //consulta para agregar la tarea
    const query = 'INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)';
    //ejecutar la consulta
    dbConnection.query(query, [task.user_id, task.title, task.description, task.status, task.priority, task.due_date], (err, result) => {
        if (err) {
            console.log('Error al agregar la tarea: ', err);
            res.status(500).send('Error al agregar la tarea');
            return;
        }
        res.status(201).json({ message: 'Tarea agregada correctamente' });

    });
}

//controlador de Express para actualizar una tarea
function updateTask(req, res) {
    const taskId = req.params.id;
    const task = req.body;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE task_id = ?';
    
    dbConnection.query(query, [task.title, task.description, task.status, task.priority, task.due_date, taskId], (err, result) => {
        if (err) {
            console.log('Error al actualizar la tarea: ', err);
            res.status(500).send({ error: 'Error al actualizar la tarea' });
            return;
        }
        res.status(200).json({ message: 'Tarea actualizada correctamente' });
    });
}


//funcion para eliminar tarea
function deleteTask(req, res) {
    const taskId = req.params.id;
    const query = 'UPDATE tasks SET estado = ? WHERE task_id = ?';

    dbConnection.query(query, ['0', taskId], (err, result) => {
        if (err) {
            console.error('Error al marcar la tarea como eliminada:', err);
            res.status(500).send('Error al marcar la tarea como eliminada');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Tarea no encontrada');
        } else {
            res.status(200).json({ message: 'Tarea marcada como eliminada correctamente' });
        }
    });
}


//funcion para actualizar el estado de la tarea
function updateStatus(req, res) {
    const taskId = req.params.id;
    const query = 'SELECT status FROM tasks WHERE task_id = ?';

    dbConnection.query(query, [taskId], (err, rows) => {
        if (err) {
            console.error('Error al consultar el estado de la tarea:', err);
            res.status(500).send('Error al consultar el estado de la tarea');
            return;
        }
        if (rows.length > 0) {
            const currentStatus = rows[0].status;
            const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
            const updateQuery = 'UPDATE tasks SET status = ? WHERE task_id = ?';

            dbConnection.query(updateQuery, [newStatus, taskId], (updateErr, result) => {
                if (updateErr) {
                    console.error('Error al actualizar el estado de la tarea:', updateErr);
                    res.status(500).send('Error al actualizar el estado de la tarea');
                    return;
                }
                res.status(200).json({ message: 'Estado de la tarea actualizado correctamente' });
            });
        } else {
            res.status(404).send('Tarea no encontrada');
        }
    });
}

//controlador para obtener todas las tareas de un usuario
function getTasksByUserId(req, res) {
    //obtener el id del usuario de la solicitud
    const userId = req.params.id;
    //consulta para obtener todas las tareas de un usuario
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    //ejecutar la consulta
    dbConnection.query(query, [userId], (err, rows) => {
        if (err) {
            console.log('Error al obtener las tareas: ', err);
            res.status(500).send('Error al obtener las tareas');
            return;
        }
        res.json(rows);
    });
}
  

  
//exportar el controlador
module.exports = {
    getTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    getTasksByUserId,
    updateTaskStatus,
    updateStatus
}