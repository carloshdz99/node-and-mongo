const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session= require('express-session');
const flash = require('connect-flash');

//inicializaciones
const app = express();
require('./database');//iniciando la conexion a la base

//configuraciones
app.set('port',process.env.PORT || 3000); //configurando el puerto de conexion
app.set('views', path.join(__dirname, 'views')); //se le dice a node donde esta la carpeta de las vistas
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// variables globales
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// rutas
app.use(require('./routes/index'));
app.use(require('./routes/empleados'));

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// servidor escucando
app.listen(app.get('port'), () =>{
    console.log("Server en el puerto", app.get('port'));
});