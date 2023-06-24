const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');
const mysql=require('mysql');
const session=require('express-session');
const sweetalert=require('sweetalert2');
const {check,validationResult}=require('express-validator');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

module.exports=router;
router.get('/',(req,res)=>{
    // res.render('verify.ejs');
})

router.post('/',(req,res)=>{
     const id=req.body.id;
     const token=req.body.token;
     db.matchtoken(id,token,(err,result)=>{
        console.log(result);
        if(result.length>0){
            const email=result[0].email;
            const email_status="verified";
            db.updateverify(email,email_status,(err,result)=>{
                res.send("Email verified");
            })
        }else{
            res.send("Token did not match");
        }
     })
})