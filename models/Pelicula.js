const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: String,
  director: String,
  genero: String,
  anio: Number,
  clasificacion: String,
  duracion: Number,
  idioma: String
});

module.exports = mongoose.model('Pelicula', peliculaSchema);
