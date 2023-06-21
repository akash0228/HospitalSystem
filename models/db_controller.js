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

module.exports.findOne=(email,callback)=>{
    const query="SELECT * FROM users WHERE email='"+email+"' "; 
    con.query(query,callback);
    console.log(query);
};

module.exports.temp=(id,email,token,callback)=>{
    const query="INSERT INTO `temp` (`email`,`id`,`token`) VALUES ('"+email+"','"+id+"','"+token+"')";
    con.query(query,callback);
    console.log(query);
};

module.exports.add_doctor=(first_name,last_name,email,dob,gender,address,phone,image,department,biography,callback)=>{
    const query="INSERT INTO `doctor` (`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) VALUES ('"+first_name+"','"+last_name+"','"+email+"','"+dob+"','"+gender+"','"+address+"','"+phone+"','"+image+"','"+department+"','"+biography+"')";
    con.query(query,callback);
    console.log(query);
};

module.exports.getAllDoc=(callback)=>{
    const query="SELECT * FROM doctor"
    con.query(query,callback);
    console.log(query);
};

module.exports.getDocById=(id,callback)=>{
    const query="SELECT * FROM doctor WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.editDoctor=(first_name,last_name,email,dob,gender,address,phone,department,biography,id,callback)=>{
    const query="UPDATE `doctor` SET `first_name`='"+first_name+"',`last_name`='"+last_name+"',`email`='"+email+"',`dob`='"+dob+"',`gender`='"+gender+"',`address`='"+address+"',`phone`='"+phone+"',`department`='"+department+"',`biography`='"+biography+"' WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.deleteDoc=(id,callback)=>{
    const query="DELETE FROM doctor WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.searchDoc=(key,callback)=>{
    const query="SELECT  FROM doctor WHERE first_name like "%"'"+key+"'"%" ";
    con.query(query,callback);
    console.log(query);
};

module.exports.getalldept=(callback)=>{
    const query="SELECT * FROM departments"
    con.query(query,callback);
    console.log(query);
};



