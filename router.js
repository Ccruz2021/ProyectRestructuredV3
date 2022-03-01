const express = require('express');
const pool = require('./database/db');
const  passport = require('passport')
const router = express.Router()
const {isLoggedIn, isNotLoggedIn,Auth} = require('./controller/Log')

//sobre nosotros
router.get('/about',(req, res)=>{
 res.render ('about')
})

router.get('/', (req, res ) =>{
    pool.query('SELECT * FROM productos', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('index',{results: results});
   }
    })

})
// guardar carrito
const newAdd = require('./controller/carrito');
router.post('/agregar', isLoggedIn, (newAdd.agregar))

router.get('/information/:id', async(req,res) =>{
    const id = req.params.id;
   await pool.query('SELECT * FROM productos where id = ?',[id], (error, results) =>{
        if (error) {
            throw  error ;
        } else {
         res.render('information',{productos: results[0]});
        }
         })
})

//carrito routers
router.get('/carrito',isLoggedIn, (req,res) =>{
        pool.query('SELECT * FROM carrito where id_cliente = ? ',[ req.user.id], (error, results) =>{
            if (error) {
                throw  error ;
            } else {
             res.render('carrito',{results: results});
            }
             })
})
// borrar productos del carrito
router.get('/delete/:id_carrito', isLoggedIn, async(req,res) =>{
    const {id_carrito} = req.params
    await pool.query('DELETE FROM carrito WHERE id_carrito = ?',[id_carrito], (error, results)=>{
        if (error) {
            throw error 
        } else {
            req.flash('success', ' Se ha borrado correctamente' )
            res.redirect('/carrito')
        }

    })
})



//historial
router.use ('/historial', isLoggedIn, async(req, res) => {
    await pool.query('SELECT * FROM historial WHERE id_cliente = ? ',[req.user.id],(error,results)=>{
   if (error) {
       throw error 
   } else {
    res.render('historial',{results: results} )
   }

    } )
})

//controler del historial 
const newcompra = require('./controller/history')
router.post('/comprar',(newcompra.comprar))



// login register
router.use('/register', isNotLoggedIn,(req, res) =>{
            res.render('register') 
    })

router.post('/registro',passport.authenticate('local.register',{
  successRedirect: '/' ,
  failureRedirect: '/login',
  failureFlash: true

}))

// login routes
router.use('/login', isNotLoggedIn,  (req, res) =>{
 res.render('login')
})
router.post('/logear',(req,res,next) =>{
  passport.authenticate('local.login',{
      successRedirect:'/',
      failureRedirect:'/login',
      failureFlash: true 
  })(req,res,next)
})
router.get('/logout', isLoggedIn,  (req, res) =>{
 req.logOut();
 res.redirect('/login')
})


//// CRUD 
router.get('/crud', isLoggedIn,Auth ,async (req, res) =>{
   await pool.query(' SELECT * FROM productos',(error, results) =>{
   if (error) {
       throw error
   } else {
       res.render('crud',{results:results})
   }
   })
})

//router Create
router.get('/create', isLoggedIn, Auth ,  (req, res) =>{
 res.render('create')

})
const newproducto = require('./controller/create')
router.post('/create', (newproducto.create)) 

 //Router Update
 router.get('/edit/:id', isLoggedIn,Auth ,async(req, res) =>{
   const id = req.params.id
   await pool.query('SELECT * FROM productos WHERE id = ?',[id],(error, results)=>{
       if (error) {
           throw error
       } else {
        res.render('edit',{update:results[0]})
       }
   })
 })
 router.post('/update',(newproducto.update))

 //DELETE
 router.get('/supr/:id',isLoggedIn,Auth, async(req,res) =>{
    const {id} = req.params
    await pool.query('DELETE FROM productos WHERE id = ?',[id], (error, results)=>{
        if (error) {
            throw error 
        } else {
            req.flash('success', 'El producto se ha eliminado correctamente' )
            res.redirect('/crud')
        }

    })
})

// CRUD CLIENTES
router.get('/clientes',isLoggedIn,Auth,async(req, res)=>{
await pool.query('SELECT * FROM cliente',(error,results)=>{
    if (error) {
        throw error
    } else {
        res.render('clientes',{results:results})
    }
 })
})

//editar clientes
router.get('/editcliente/:id',isLoggedIn,Auth, async(req, res)=> {
const id = req.params.id
await pool.query('SELECT * FROM cliente WHERE id = ?', [id],(error, results)=>{
 if (error) {
     throw error
 } else {
     res.render('editcliente',{upcliente:results[0]}) 
 }
  })
})
const upclientes = require('./controller/upcliente') 
router.post('/upcliente',(upclientes.upcliente))

// DELETE CLIENTES
router.get('/quitar/:id',isLoggedIn,Auth, async(req,res) =>{
    const {id} = req.params
    await pool.query('DELETE FROM cliente WHERE id = ?',[id], (error, results)=>{
        if (error) {
            throw error 
        } else {
            req.flash('success', 'El cliente se ha eliminado correctamente' )
            res.redirect('/clientes')
        }

    })
})
router.get('/quita/:id',isLoggedIn,Auth, async(req,res) =>{
    const {id} = req.params
    await pool.query('DELETE FROM historial WHERE id_cliente = ?',[id], (error, results)=>{
        if (error) {
            throw error 
        } else {
            req.flash('success', 'El historial del cliente se ha eliminado correctamente' )
            res.redirect('/clientes')
        }

    })
})

// TOP Seller
router.get('/top',(req, res)=>{
    pool.query(' Select imagen, producto, n_producto, description, precio , SUM(cantidad) as total From historial Group by n_producto ORDER BY total desc',(error, results)=>{
        if (error) {
            throw error
        } else {
            res.render('top',{results: results})
        }
    } )
})
//silla
router.get('/silla', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Silla"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('silla',{results: results});
   }
    })

})
//ropero
router.get('/ropero', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto= "Ropero"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('ropero',{results: results});
   }
    })

})
//escritorio
router.get('/escritorio', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto= "Escritorio"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('escritorio',{results: results});
   }
    })

})
//  amoblamiento
router.get('/amoblamiento', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Amoblamiento"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('amoblamiento',{results: results});
   }
    })

})
// Zapatero
router.get('/zapatero', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Zapatero"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('zapatero',{results: results});
   }
    })

})
//living
router.get('/living', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Living"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('living',{results: results});
   }
    })

})
// canastero
router.get('/canastero', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Canastero"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('canastero',{results: results});
   }
    })

})
//mesa
router.get('/mesa', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Mesa"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('mesa',{results: results});
   }
    })

})
// Chifonier
router.get('/chifonier', (req, res ) =>{
    pool.query('SELECT * FROM productos where producto = "Chifonier"', (error, results) =>{
   if (error) {
       throw  error ;
   } else {
    res.render('chifonier',{results: results});
   }
    })

})



// factura
router.get('/factura',isLoggedIn, (req,res) =>{
    pool.query('SELECT * FROM carrito where id_cliente = ? ',[ req.user.id], (error, results) =>{
        if (error) {
            throw  error ;
        } else {
         res.render('factura',{results: results});
        }
         })
})


module.exports = router;
