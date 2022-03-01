const mysql = require('mysql')
const {database} = require('../keys')
const {promisify} = require('util')
const pool = mysql.createPool(database)
pool.getConnection((err,connection) => {
 if(err){
     if(err.code === 'PROTOCOL_CONNECTION:LOST'){
         console.error('DATABASE CONNECTION WAS CLOSED');
     }
 if (err.code === 'ER_CON_COUNT_ERROR:'){
    console.error('DATABASE HAS TO MANY CONNECION')
   }
   if (err.code === 'ECONNREFUSED'){
       console.error('DATABASE CONNECTION REFUSED')
   } 
 }
 if (connection) connection.release();
 console.log('Base de Datos conectada')
 return;
     
 })

 //colbacks a promesas
pool.query = promisify(pool.query)
module.exports = pool