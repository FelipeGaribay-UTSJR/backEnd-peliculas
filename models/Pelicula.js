const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: String,
  director: String,
  genero: String,
  anio: String,
  clasificacion: String,
  duracion: String,
  idioma: String
});

module.exports = mongoose.model('Pelicula', peliculaSchema, 'Peliculas');