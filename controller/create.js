const pool= require('../database/db');

exports.create = async(req, res)=>{
 const {imagen, producto, nombre, description, cantidad, precio}=req.body;
 newproducto = {
     imagen,
     producto, 
     nombre, 
     description, 
     cantidad,
     precio };
     await pool.query('INSERT INTO productos set ?',[newproducto],(error,results)=>{
        if (error) {
            console.error(error);
        } else {
            req.flash('success', 'Se ha agregado el producto '+ producto +' correctamente' )
            res.redirect('/crud')
        }
     }  )
    
}


exports.update = async(req, res)=>{
    const {id, imagen, producto, nombre, description, cantidad, precio}=req.body;
    up = {
        imagen,
        producto, 
        nombre, 
        description, 
        cantidad,
        precio };
        await pool.query('UPDATE productos set ? WHERE id = ?',[up, id],(error,results)=>{
           if (error) {
               console.error(error);
           } else {
               req.flash('success', 'El producto ' + nombre + ' se ha actualizado correctamente' )
               res.redirect('/crud')
           }
        })
       
   }