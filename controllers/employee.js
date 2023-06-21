const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');

//if not loggined 
router.get('*',(req,res,next)=>{
    if(req.cookies['username']==null){
        res.redirect('/login');
    }else{
         next();
    }
})



module.exports=router;