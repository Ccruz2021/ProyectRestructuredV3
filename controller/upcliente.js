const pool= require('../database/db');


exports.upcliente = async(req, res)=>{
    const{id,nombre,apellido,email,provincia,departamento ,direccion, rol}=req.body;
     console.log(req.body)
    update={
         nombre,
         apellido,
         email,
         provincia,
         departamento,
          direccion,
          rol
        };
  await pool.query('UPDATE cliente SET ? WHERE id = ?',[update, id],(error,results)=>{
 if (error) {
     console.error(error);
 } else {
     req.flash('success','El cliente '+ nombre + ' ' + apellido + ' se ha actualizado correctamente'); 
     res.redirect('/clientes')
 }

  })

}