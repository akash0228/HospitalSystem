const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');

router.get('*',(req,res,next)=>{
    if(req.cookies['username']==null){
        res.redirect('/login');
    }else{
         next();
    }
});

router.get('/',(req,res)=>{
    db.getAllAppointment((err,result)=>{
        console.log(result);
        res.render('appointment.ejs',{list:result});
    })
});

router.get('/add_appointment',(req,res)=>{
    res.render('add_appointment.ejs')
});

router.post('/add_appointment',(req,res)=>{
      db.add_appointment(req.body.p_name,req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,(err,result)=>{
        res.redirect('/appointment');
      })
});

router.get('/edit_appointment/:id',(req,res)=>{
     const id=req.params.id;
     db.getAppointmentById(id,(err,result)=>{
        console.log(result);
          res.render('edit_appointment.ejs',{list:result});
     });
})

router.post('/edit_appointment/:id',(req,res)=>{
    const id=req.params.id;
      db.editAppointment(id,req.body.p_name,req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,(err,result)=>{
           res.redirect('/appointment');
      })
});

router.get('/delete_appointment/:id',(req,res)=>{
    const id=req.params.id;
    db.getAppointmentById(id,(err,result)=>{
        console.log(result);
        res.render('delete_appointment.ejs',{list:result});
    })
});

router.post('/delete_appointment/:id',(req,res)=>{
    const id=req.params.id;
    db.deleteAppointment(id,(err,result)=>{
        res.redirect('/appointment');
    })
});

module.exports=router;
