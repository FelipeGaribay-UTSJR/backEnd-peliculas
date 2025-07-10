const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();
const peliculaRouter = require('./routes/pelicula.routes');

// Conexión con la base de datos
mongoose
    //.connect('mongodb://127.0.0.1:27017/peliculas')
    .connect('mongodb+srv://felipeguti22:lxIzfA3jddNE66zu@cluster0.ic4oy6k.mongodb.net/peliculas?retryWrites=true&w=majority&appName=Cluster0')
    .then((x) => {
        console.log(`Conectado exitosamente a la base de datos: "${x.connections[0].name}"`);
    })
    .catch((error) => {
        console.error('Error al conectarse a Mongo:', error.reason);
    });

// Middleware para parsear JSON y datos urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilitar CORS
app.use(cors());

// Usar rutas con prefijo /api
app.use('/api', peliculaRouter);

// Ruta raíz para probar que el servidor está activo
app.get('/', (req, res) => {
    res.send('API de películas funcionando correctamente');
});

// Manejador de error 404
app.use((req, res, next) => {
    next(createError(404));
});

// Manejador de errores general
app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Puerto
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto: ' + port);
});
