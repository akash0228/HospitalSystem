const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');
const mysql=require('mysql');
const session=require('express-session');
const sweetalert=require('sweetalert2');
const {check,validationResult}=require('express-validator');


const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hmsystem'
});

//when user returns on same browser
router.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',[check('username').notEmpty().withMessage("username required"),
                 check('password').notEmpty().withMessage("password required"),
],(req,res)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(422).json({errors:err.array()})
    }
    const username=req.body.username;
    const password=req.body.password;

    if(username && password){
        con.query('SELECT * FROM users WHERE username=? and password=?',[username,password],(err,results,fields)=>{
             if(results.length>0){
                req.session.loggedin=true;
                req.session.username=username;
                res.cookie('username',username);
                const status=results[0].email_status;
                if(status==="not_verified"){
                    res.send("Please verify your Email");
                }
                else{
                    sweetalert.fire("logged in");
                    res.redirect('/home');
                }
             }else{
                res.send("incorrect Username/password");
             }
             res.end();
        })
    }else{
        res.send("please enter your username and password");
        res.end();
    }
})

module.exports=router;