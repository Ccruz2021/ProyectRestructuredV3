const pool= require('../database/db');

exports.comprar = async(req, res,) => {
   const {id_carrito,imagen, producto, n_producto, description, cantidad, precio,} = req.body;
   id_cliente= req.user.id
  
   console.log(req.body);
   
   for (let i = 0; i < imagen.length; i++) {
     await pool.query('INSERT INTO historial (imagen, producto, n_producto, description, cantidad, precio, id_cliente ) Values (?,?,?,?,?,?,?)', [ imagen[i],  producto[i], n_producto[i], description[i], cantidad[i], precio[i], id_cliente ]); 
     await pool.query('UPDATE productos set cantidad = cantidad - ? WHERE imagen = ?',[cantidad[i], imagen[i]]);
     await pool.query('Delete FROM carrito WHERE id_carrito = ?',[id_carrito[i]]
     ); if (true) {

       req.flash('success','Su compra ha sido exitosa')
         res.redirect('/')
    }
}
} 
/*
exports.compra = async (req, res) => {

  const {imagen,cantidad} = req.body;
  console.log(cantidad)

  for (let i = 0; i < imagen.length; i++) {
    console.log(imagen[i]);
    await pool.query('UPDATE productos set cantidad = ? WHERE imagen = ?',[cantidad[i], imagen[i]]
   
    ); if (true) {
      res.redirect('/')
      
    }
  }

}
   
*/

     /*
   const newcompra = {
    imagen,
     producto, 
     n_producto,
     description,
     cantidad, 
     precio,
     id_cliente: req.user.id 
   }
 
   await pool.query('INSERT INTO historial set ?',[newcompra],(error,result)=>{
     if (error) {
         console.log(error)
     } else {
         req.flash('success','Su compra ha sido exitosa')
         res.redirect('/')
     }
   } ) 
   */

