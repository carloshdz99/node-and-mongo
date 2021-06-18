//llamando express para crear las rutas de index
const express = require('express');
const router = express.Router();
//se inicia el modelo empleados donde se guarda el formatod de los valores
//que se estan registrando en la base
const emple = require('../models/Empleados'); 

//ruta para ver los empleados
router.get('/empleados', async (req, res) => {
    //esperando que se carguen los datos desde la base
    await emple.find()
        .then(documentos => {
            const contexto = {
                empleadosCont: documentos.map(documento => {
                    return {
                        _id: documento._id,
                        nombres: documento.nombres,
                        apellidos: documento.apellidos,
                        edad: documento.edad,
                        telefono: documento.telefono,
                        fecha_nacimiento: documento.fecha_nacimiento.toISOString().substring(0,10),
                        correo: documento.correo,
                        direccion: documento.direccion
                    }
                })
            }
            res.render('users/empleados', { empleadosDb: contexto.empleadosCont });
        });

})

//ruta para pantalla de editar empleados
router.get('/empleados/edit/:id', async (req, res) => {
    const id = req.params.id;
    const editEmpleado = await emple.findById(id);
    res.render("users/empleadoEdit", {nombres: editEmpleado.nombres, 
        apellidos: editEmpleado.apellidos,
        edad: editEmpleado.edad,
        telefono: editEmpleado.telefono,
        fecha_nacimiento: editEmpleado.fecha_nacimiento,
        correo: editEmpleado.correo,
        direccion: editEmpleado.direccion,
        _id: editEmpleado._id
    });
});

//ruta para editar empleados
router.put('/empleados/edit-empleado/:id', async (req, res) => {
    const { nombres, apellidos, edad, telefono, fecha_nacimiento, correo, direccion } = req.body;
    //arreglo para validacion de errores
    const errors = [];
     //se valida que cada uno de los valores que se espera recibir se este 
    //recibiendo de parte del usuario
    if (!nombres) {
        errors.push({ text: 'Por favor ingrese los nombres' });
    }
    if (!apellidos) {
        errors.push({ text: 'Por favor ingrese los apellidos' });
    }
    if (!edad) {
        errors.push({ text: 'Por favor ingrese la edad' });
    }
    if (!telefono) {
        errors.push({ text: 'Por favor ingrese el telefono' });
    }
    if (!fecha_nacimiento) {
        errors.push({ text: 'Por favor ingrese la fecha de nacimiento' });
    }
    if (!correo) {
        errors.push({ text: 'Por favor ingrese el correo electronico' });
    }
    if (!direccion) {
        errors.push({ text: 'Por favor ingrese la direccion' });
    }
    await emple.findByIdAndUpdate(req.params.id, {nombres, apellidos, edad, telefono, fecha_nacimiento, correo, direccion});
    req.flash('success_msg', 'Registro actualizado!, se edito los datos del empleado')
    res.redirect('/empleados');
});

//ruta para eliminar a un empleado
router.delete('/empleados/delete-empleado/:id', async (req, res) =>{
    const id = req.params.id;
    await emple.findByIdAndDelete(id);
    req.flash('error_msg', 'Dato eliminado!')
    res.redirect('/empleados');
})

//ruta para registrar empleados
router.get('/empleados/new', (req, res) => {
    res.render('users/empleadoForm');
})

//ruta para recibir datos
router.post('/empleados/new-emplado', async (req, res) => {
    //obteniendo los valores por separado
    const { nombres, apellidos, edad, telefono, fecha_nacimiento, correo, direccion } = req.body;
    const errors = [];

    //se valida que cada uno de los valores que se espera recibir se este 
    //recibiendo de parte del usuario
    if (!nombres) {
        errors.push({ text: 'Por favor ingrese los nombres' });
    }
    if (!apellidos) {
        errors.push({ text: 'Por favor ingrese los apellidos' });
    }
    if (!edad) {
        errors.push({ text: 'Por favor ingrese la edad' });
    }
    if (!telefono) {
        errors.push({ text: 'Por favor ingrese el telefono' });
    }
    if (!fecha_nacimiento) {
        errors.push({ text: 'Por favor ingrese la fecha de nacimiento' });
    }
    if (!correo) {
        errors.push({ text: 'Por favor ingrese el correo electronico' });
    }
    if (!direccion) {
        errors.push({ text: 'Por favor ingrese la direccion' });
    }
    //en dado caso haya errores se mandaran los valores que si se ingresaron
    //y se enviara el arreglo con los errores que se recibieron
    if (errors.length > 0) {
        res.render('users/empleadoForm', {
            errors,
            nombres,
            apellidos,
            edad,
            telefono,
            fecha_nacimiento,
            correo,
            direccion
        });
        //en dado caso no exista errores se guardaran los datos en la base
    } else {
        const newemple = new emple({ nombres, apellidos, edad, telefono, fecha_nacimiento, correo, direccion });
        //node espera que la base responda que si se ingresaron los valores
        await newemple.save();
        req.flash('success_msg', 'Registro exitoso!, empleado agregado')
        //se redirige a la pagina donde se muestran todos los empleados
        //registrados
        res.redirect('/empleados');
    }

})

//exportando todas las rutas para que sean encontradas por el servidor
module.exports = router;