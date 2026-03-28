const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('■ Conectado a MongoDB Atlas'))
.catch(err => console.error('■ Error de conexión:', err));
// Esquema y Modelo de Persona
const personaSchema = new mongoose.Schema({
nombre: { type: String, required: true },
apellido: { type: String, required: true },
edad: { type: Number, required: true },
correo: { type: String, required: true },
telefono: { type: String },
ciudad: { type: String }
}, { timestamps: true });
const Persona = mongoose.model('Persona', personaSchema);
// ■■ RUTAS (Endpoints) ■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// GET /personas → Obtener todas las personas
app.get('/personas', async (req, res) => {
try {
const personas = await Persona.find();
res.json(personas);
} catch (error) {
res.status(500).json({ mensaje: 'Error al obtener personas' });
}
});

// POST /personas → Guardar una persona nueva
app.post('/personas', async (req, res) => {
try {
const nuevaPersona = new Persona(req.body);
const guardada = await nuevaPersona.save();
res.status(201).json(guardada);
} catch (error) {
res.status(400).json({ mensaje: 'Error al guardar', error });
}
});
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`■ Servidor corriendo en http://localhost:${PORT}`);
});