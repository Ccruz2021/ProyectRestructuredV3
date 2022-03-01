const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const mysqlstore= require('express-mysql-session')
const passport = require('passport')
const  bcryptjs = require('bcryptjs')
const {json} = require('express');
const {database} = require('./keys')




//initialize
const app = express()
require('./controller/cliente')


//Settings
app.set('view engine', 'ejs')

//midlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express(json))
app.use(flash())
app.use(session({
 secret: 'MySuPerSeCrEts',
 resave: false,
 saveUninitialized: false,
 store: new mysqlstore(database)

}))
app.use(passport.initialize())
app.use(passport.session())
// Globals varials
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
 next();
})
//public
app.use(express.static(path.join(__dirname, 'public')))
//routes
app.use('/',require('./router'));

app.listen(7500, ()=>{
    console.log('la conexion es un exito http://localhost:7500')
})
