const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb://MongoDBT2:27017/tarea2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});


// Definir el esquema de la foto
const photoSchema = new mongoose.Schema({
  imageData: String,
  uploadDate: { type: Date, default: Date.now }
});
const Photo = mongoose.model('Photo', photoSchema);

app.use(express.json());

// Ruta para recibir la foto en base64 y guardarla en la base de datos
app.post('/upload-photo', async (req, res) => {
  const base64Image = req.body.photo; // Suponiendo que el cuerpo de la solicitud tiene una propiedad llamada "photo" que contiene la imagen en base64
  
  try {
    const newPhoto = new Photo({ imageData: base64Image });
    await newPhoto.save();
    res.send('¡Foto recibida y guardada en la base de datos!');
  } catch (error) {
    console.error('Error al guardar la foto:', error);
    res.status(500).send('Error al guardar la foto en la base de datos');
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
