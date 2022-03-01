const passport = require('passport')
const pool = require('../database/db')
const LocalStrategy = require('passport-local').Strategy
const encrypt = require('./encrypt')

// Registro 
passport.use ('local.register' , new LocalStrategy({
  usernameField : 'email',
  passwordField : 'contrasena',
  passReqToCallback: true
},async(req, email, contrasena, done) => {
  const{nombre, apellido, provincia, departamento, direccion, rol} = req.body
  const newUser = {
      nombre ,
      apellido,
      email ,
      provincia, 
      departamento,
      direccion,
      rol,
      contrasena
  }
  newUser.contrasena = await encrypt.encryptPassword(contrasena)
  const result = await pool.query('INSERT INTO cliente set ?', [newUser] )
  console.log(result)
  newUser.id = result.insertId
  return done(null, newUser)
})); 
// inicio sesion 
passport.use('local.login', new LocalStrategy({
 usernameField:'email',
 passwordField:'contrasena' ,
 passReqToCallback: true
}, async(req,email,contrasena, done)=>{
 const rows = await pool.query('SELECT * FROM cliente WHERE email = ?', [email])
 console.log(req.body)
 if (rows.length > 0) {
     const user = rows[0]
     const validpassword = await encrypt.matchPassword(contrasena, user.contrasena) 
    if (validpassword){
       done(null , user, req.flash('success','Bienvenido'+" " + user.nombre + " " + user.apellido))
    }
    done(null , false, req.flash('message','Incorrect Password'))
 } else {
     return done(null , false, req.flash('message','El usuario no existe'))
 }
}));

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async(id, done)=>{
 const rows = await pool.query('SELECT * FROM cliente WHERE id = ? ', [id])
  done(null, rows[0] )

} )

