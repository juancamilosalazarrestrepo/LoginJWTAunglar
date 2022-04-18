const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.get('/', (req,res)=>{
    mysqlConnection.query('select * from users',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })

});

router.post('/singin',(req,res)=>{
   const {userName,pass} = req.body;
   mysqlConnection.query('select userName,roleId from users where userName= ? and pass=?',
   [userName,pass],
   (err,rows,fields)=>{
       if(!err){
       if(rows.length > 0 ){
           let data = JSON.stringify(rows[0]);
           const token = jwt.sign(data, 'camilo');
           res.json({token});
       }else{
           res.json('Usuario o clave incorrectos');
       }
       }else{
           console.log(err);
       }
   }
   )
})

router.post('/test',verifyToken,(req,res)=>{
    console.log(req.data);
   
    res.json('informacion secreta');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) {return res.status(401).json('no autorizado')};

    const token = req.headers.authorization.substr(7);
    if(token!==''){
      const content=   jwt.verify(token,'camilo');
      req.data = content;
      next();
    }else{
        res.status(401).json('token vacio');
    }

}

module.exports = router;
 