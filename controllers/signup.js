const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');
const mysql=require('mysql');
const nodemailer=require('nodemailer');
const randomToken=require('random-token');
const {check,validationResult}=require('express-validator');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',[check("username").notEmpty().withMessage("username is required"),
                 check("password").notEmpty().withMessage("password is required"),
                 check("email").notEmpty().withMessage("email is required"),
],(req,res)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(422).json({err:err.array()});
    }
    const email_status="not_verified";
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    db.signup(req.body.username,req.body.email,req.body.password,email_status);
    const token=randomToken(8);
    db.verify(username,email,token);

    db.getuserid(email,(err,result)=>{
        const id=result[0].id;
        const output=`<p>Dear ${username}</p>
        <p>Thanks for signup. Your verification id and token is given below:</p>
        <ul>
        <li>User Id:${id}</li>
        <li>token:${token}</li>
        </ul>
        <p>verify link:<a href="http:/localhost:3000/verify"></a></p>
        <p><b>This is automatically generated mail</b></p>
        `;

        const transporter=nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: 'sophie67@ethereal.email',
              pass: 'xy9fcuzqrZ6WQqerFV'
            }
        });

        const mailOptions={
            from:"HmSystem@gmail.com",
            to:email,
            subject:'email verification',
            html:output
        };

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return console.log(err);
            }
            console.log(info);
        });

        res.send("check your email for token to verify");
    })
});

module.exports=router;