 const encrypt = {}
 const bcryptjs = require('bcryptjs')

 encrypt.encryptPassword = async(contrasena) =>{
     const salt = await bcryptjs.genSalt(8)
     const hash = await bcryptjs.hash(contrasena,salt)
     return hash;
 }
 encrypt.matchPassword = async(contrasena, savedpassword) =>{
     try {
         return await bcryptjs.compare(contrasena,savedpassword)
     }catch(e){
         console.log(e)
     }
 }

 module.exports = encrypt