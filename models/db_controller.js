const mysql=require('mysql');
const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');


const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hmsystem'
});

con.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('you are connected to database');
    }
});

module.exports.signup=(username,email,password,status,callback)=>{
    con.query('SELECT email FROM users WHERE email="'+email+'" ',
    (err,result)=>{
        console.log(result[0])
        if(result[0]==undefined){
            const query="INSERT INTO `users` (`username`,`email`,`password`,`email_status`) VALUES('"+username+"','"+email+"','"+password+"','"+status+"')";
            con.query(query,callback);
            console.log(query);
        }
        else{
            console.log(err);
        }
    })
};

module.exports.verify=(username,email,token,callback)=>{
   const query="INSERT INTO `verify` (`username`,`email`,`token`) VALUES('"+username+" ','"+email+"','"+token+"')";
   con.query(query,callback);
};


module.exports.getuserid=(email,callback)=>{
    const query="SELECT * FROM verify WHERE email='"+email+"' "; 
    con.query(query,callback);
};

module.exports.matchtoken=(id,token,callback)=>{
    const query="SELECT * FROM verify WHERE token='"+token+"' and id='"+id+"' "; 
    con.query(query,callback);
    console.log(query);
};

module.exports.updateverify=(email,email_status,callback)=>{
   const query="UPDATE INTO `users` SET `email_status`='"+email_status+"' WHERE `email`='"+email+"' ";
   con.query(query,callback);
   console.log(query);
};

