const express = require('express')
const peliculaRouter = express.Router()

//declaramos un objeto de nuestro modelo
let Pelicula = require('../models/Pelicula')

//agregar una nueva película
peliculaRouter.route('/agregar').post((req, res) => {
    console.log('Datos recibidos:', req.body);
    Pelicula.create(req.body)
        .then((data) => {
            console.log('Película agregada correctamente:', data);
            res.status(201).json(data);
        })
        .catch((error) => {
            console.error('Error al agregar película:', error);
            res.status(500).json({ error: 'Error al agregar la película', details: error.message });
        })
})

//obtenemos todas las películas
peliculaRouter.route('/peliculas').get((req, res) => {
    Pelicula.find()
    .then((data) => {
        console.log('Películas obtenidas:', data.length);
        res.json(data);
    })
    .catch((error) => {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas', details: error.message });
    })
})

//obtenemos una sola película por su ID
peliculaRouter.route('/pelicula/:id').get((req, res) => {
    Pelicula.findById(req.params.id)
    .then((data) => {
        if (!data) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(data);
    })
    .catch((error) => {
        console.error('Error al obtener película:', error);
        res.status(500).json({ error: 'Error al obtener la película', details: error.message });
    })
})

//actualizamos una película
peliculaRouter.route('/actualizar/:id').put((req, res) => {
    Pelicula.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
    .then((data) => {
        if (!data) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        console.log('Película actualizada correctamente:', data);
        res.json(data);
    })
    .catch((error) => {
        console.error('Error al actualizar película:', error);
        res.status(500).json({ error: 'Error al actualizar la película', details: error.message });
    })
})

//eliminamos una película
peliculaRouter.route('/eliminar/:id').delete((req, res) => {
    Pelicula.findByIdAndDelete(req.params.id)
    .then((data) => {
        if (!data) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        console.log('Película eliminada correctamente:', data);
        res.json({ message: 'Película eliminada correctamente', data });
    })
    .catch((error) => {
        console.error('Error al eliminar película:', error);
        res.status(500).json({ error: 'Error al eliminar la película', details: error.message });
    })
})

module.exports = peliculaRouter;