module.exports ={
 isLoggedIn:(req,res,next) => {
     if(req.isAuthenticated()) {
         return next();
     }
     req.flash('message', 'Se necesita iniciar sesion o Registrarse para proceder')
     return res.redirect('/login');
 },
 isNotLoggedIn:(req,res,next) => {
     if (!req.isAuthenticated()) {
         return next();
     }
    return res.redirect('/login');
 },
 Auth:(req,res,next) => {
     if (req.user && req.user.rol === "Admin") {
         return next();   
     }
        req.flash('message', ' Eres un Usuario no autorizado')

         return res.redirect('/')
     
 }

}