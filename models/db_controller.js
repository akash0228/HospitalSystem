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

module.exports.getleavebyid=(id,callback)=>{
    const query="SELECT * FROM leaves WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.add_leave=(id,name,type,from,to,reason,callback)=>{
    const query="INSERT INTO `leaves` (`emp_id`,`employee`,`leave_type`,`date_from`,`date_to`,`reason`) VALUES ('"+id+"','"+name+"','"+type+"','"+from+"','"+to+"','"+reason+"')";
    con.query(query,callback);
    console.log(query);
};

module.exports.deleteleave=(id,callback)=>{
    const query="DELETE FROM leaves WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.deleteEmp=(id,callback)=>{
    const query="DELETE FROM employee WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.getAllEmployee=(callback)=>{
    const query="SELECT * FROM employee"
    con.query(query,callback);
    console.log(query);
};

module.exports.add_employee=(name,email,contact,join_date,role,salary,callback)=>{
    const query="INSERT INTO `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`) VALUES ('"+name+"','"+email+"','"+contact+"','"+join_date+"','"+role+"','"+salary+"')";
    con.query(query,callback);
    console.log(query);
};

module.exports.getAllLeave=(callback)=>{
    const query="SELECT * FROM leaves"
    con.query(query,callback);
    console.log(query);
};

module.exports.editleave=(id,name,leave_type,from,to,reason,callback)=>{
    const query="UPDATE `leaves` SET `employee`='"+name+"',`leave_type`='"+leave_type+"',`date_from`='"+from+"',`date_to`='"+to+"',`reason`='"+reason+"' WHERE emp_id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.getEmpbyId=(id,callback)=>{
    const query="SELECT * FROM employee WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.editEmp=(id,name,email,contact,join_date,role,salary,callback)=>{
    const query="UPDATE `employee` SET `name`='"+name+"',`email`='"+email+"',`contact`='"+contact+"',`join_date`='"+join_date+"',`role`='"+role+"',`salary`='"+salary+"' WHERE id='"+id+"' ";
    con.query(query,callback);
    console.log(query);
};

module.exports.searchEmp=(key,callback)=>{
    const query="SELECT  FROM employee WHERE name like "%"'"+key+"'"%" ";
    con.query(query,callback);
    console.log(query);
};

