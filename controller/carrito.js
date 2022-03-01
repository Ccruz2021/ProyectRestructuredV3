const pool= require('../database/db');



 exports.agregar = async(req, res) => {  
     const { imagen, producto, nombre , description, cantidad, precio }  = req.body;
       const newADD= {
        imagen, 
        producto, 
        nombre , 
        description,
         cantidad, 
         precio , 
         id_cliente: req.user.id,
       }
 await pool.query('INSERT INTO carrito set ?',[newADD],(error, results) =>{
    if (error) {
        console.log(error);
    } else {
        req.flash('success', 'El producto',' ', nombre,'','se ha agregado correctamente'  )
        res.redirect('/');
    }

 })
}