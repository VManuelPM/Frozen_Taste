const express = require('express');
const path = require('path');
const morgan = require('morgan'); 
const mysql = require('mysql'); 
const myConnection = require('express-myconnection');
const bcrypt = require('bcrypt');

const app = express();
const users = [];

//Importing routes
const userRoutes = require('./routes/user');
const lineaRoutes = require('./routes/linea');
const saborRoutes = require('./routes/sabor');
const tipoRoutes = require('./routes/tipo');
const productoRoutes = require('./routes/producto');
const registerRouter = require('./routes/register');
const LoginRouter = require('./routes/login');


//Settings Express
app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'frozen_taste'
}, 'single'));
app.use(express.urlencoded({
    extended: false
}));

//Routes
app.get('/',(req,res)=>{
    res.render('index')
});


app.use('/', userRoutes);
app.use('/', lineaRoutes);
app.use('/', saborRoutes);
app.use('/', tipoRoutes);
app.use('/', productoRoutes);
app.use('/', registerRouter);
app.use('/', LoginRouter);


//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port 3000');
});