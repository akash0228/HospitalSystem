const express=require('express');
const flash=require('flash');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');
const nodemailer=require('nodemailer');
const randomToken=require('random-token');

// router.get('/',(req,res)=>{
//     res.render('resetpassword.ejs');
// })

router.post('/',(req,res)=>{
    const email=req.body.email;
    db.findOne(email,(err,resultone)=>{
       if(!resultone){
         console.log("mail doesnot exist");
         res.send('Mail doesnot exist');
       }
       const id=resultone[0].id;
       const email=resultone[0].email;
       const token=randomToken(8);
       db.temp(id,email,token,(err,result)=>{
            const output=`<p>Dear User,</p>
            <p>You are receiving this email because you requested to reset your password</p>
            <ul>
            <li>User ID: `+id+`</li>
            <li>Token: `+token+`</li>
            </ul>`;
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
                subject:'Password reset',
                html:output
            }
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    return console.log(err);
                }else{
                  console.log(info);
                }  
            });
        })
        res.send("A token has been sent to your mail adress kindly check");
    })
});

module.exports=router
