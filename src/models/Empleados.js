const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpleadoSchema = new Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    correo: { type: String, required: true },
    direccion: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Empleado', EmpleadoSchema);