const express = require('express')
const peliculaRouter = express.Router()

//declaramos un objeto de nuestro modelo
let Pelicula = require('../models/Pelicula')

//agregar un nuevo empleado
peliculaRouter.route('/agregar').post((req, res) => {
    Pelicula.create(req.body)
        .then((data) => {
            console.log('Se agrego correctamente')
    res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

//obtenemos todos los empleados
peliculaRouter.route('/peliculas').get((req, res) => {
    Pelicula.find()
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

//obtenemos un solo empleado por su ID
peliculaRouter.route('/pelicula/:id').get((req, res) => {
    Pelicula.findById(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

//actualizamos un empleado
peliculaRouter.route('/actualizar/:id').put((req, res) => {
    Pelicula.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
    .then((data) => {
        console.log('El empleado se actualizo correctamente')
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
        res.status(500).send(error)
    })
})

//eliminamos un empleado
peliculaRouter.route('/eliminar/:id').delete((req, res) => {
    Pelicula.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('El empleado se elimino correctamente')
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})

module.exports = peliculaRouter;