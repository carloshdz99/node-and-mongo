//llamando express para crear las rutas de index
const express= require('express');
const router = express.Router();

//creamos una nueva ruta que devuelve el mensaje index
router.get('/', (req , res) =>{
    res.render('index');
});

//ruta para el acerca de
router.get('/about', (req , res) =>{
    res.render('about');
});

//llamando las rutas
module.exports = router;