const dbConnection = require('../database/db');

//controlador para manejar la solicitud de obtener todos los usuarios
function getUsers(req, res) {
    //consulta para obtener todos los usuarios
    const query = 'SELECT * FROM users';
    //ejecutar la consulta
    dbConnection.query(query, (err, rows) => {
        if (err) {
            console.log('Error al obtener los usuarios: ', err);
            res.status(500).send('Error al obtener los usuarios');
            return;
        }
        res.json(rows);
    });
}

//controlador para manejar la solicitud de obtener un usuario por su id
function getUserById(req, res) {
    //obtener el id del usuario de la solicitud
    const userId = req.params.id;
    //consulta para obtener el usuario por su id
    const query = 'SELECT * FROM users WHERE user_id = ?';
    //ejecutar la consulta
    dbConnection.query(query, [userId], (err, rows) => {
        if (err) {
            console.log('Error al obtener el usuario: ', err);
            res.status(500).send('Error al obtener el usuario');
            return;
        }
        res.json(rows);
    });
}

//controlador para agregar un nuevo usuario
function addUser(req, res) {
    //obtener los datos de la solicitud
    const user = req.body;
    //consulta para agregar el usuario
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    //ejecutar la consulta
    dbConnection.query(query, [user.username, user.email, user.password], (err, result) => {
        if (err) {
            console.log('Error al agregar el usuario: ', err);
            res.status(500).send('Error al agregar el usuario');
            return;
        }
        res.status(201).send('Usuario agregado correctamente');
    });
}

//controlador para actualizar un usuario
function updateUser(req, res) {
    //obtener el id del usuario de la solicitud
    const userId = req.params.id;
    //obtener los datos de la solicitud
    const user = req.body;
    //consulta para actualizar el usuario
    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?';
    //ejecutar la consulta
    dbConnection.query(query, [user.username, user.email, user.password, userId], (err, result) => {
        if (err) {
            console.log('Error al actualizar el usuario: ', err);
            res.status(500).send('Error al actualizar el usuario');
            return;
        }
        res.status(200).send('Usuario actualizado correctamente');
    });
}

//controlador para eliminar un usuario
function deleteUser(req, res) {
    //obtener el id del usuario de la solicitud
    const userId = req.params.id;
    //consulta para eliminar el usuario
    const query = 'DELETE FROM users WHERE user_id = ?';
    //ejecutar la consulta
    dbConnection.query(query, [userId], (err, result) => {
        if (err) {
            console.log('Error al eliminar el usuario: ', err);
            res.status(500).send('Error al eliminar el usuario');
            return;
        }
        res.status(200).send('Usuario eliminado correctamente');
    });
}


//exportar el controlador
module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};