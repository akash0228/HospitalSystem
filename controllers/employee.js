const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const { check,validationResult } = require('express-validator');
const db=require.main.require('./models/db_controller');

//if not loggined 
router.get('*',(req,res,next)=>{
    if(req.cookies['username']==null){
        res.redirect('/login');
    }else{
         next();
    }
})

router.get('/',(req,res)=>{
    db.getAllEmployee((err,result)=>{
        res.render('employee.ejs',{employee:result});
    })
});

router.get('/add',(req,res)=>{
    res.render('add_employee.ejs')
});

router.post('/add',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const contact=req.body.contact;
    const join_date=req.body.date;
    const role=req.body.role;
    const salary=req.body.salary;
    db.add_employee(name,email,contact,join_date,role,salary,(err,result)=>{
        console.log('employee details added to database');
        res.redirect('/employee');
    })
});

router.get('/leave',(req,res)=>{
    db.getAllLeave((err,result)=>{
        res.render('leave.ejs',{user:result});
    })
});

router.get('/add_leave',(req,res)=>{
    res.render('add_leave.ejs');
});

router.get('/edit_leave/:id',(req,res)=>{
    const id=req.params.id;
    db.getleavebyid(id,(err,result)=>{
        res.render('edit_leave.ejs',{user:result});
    })
});

router.post('/edit_leave/:id',(req,res)=>{
    const id=req.params.id;
    db.editleave(id,req.body.name,req.body.leave_type,req.body.from,req.body.to,req.body.reason,(err,result)=>{
        res.redirect('/employee/leave');
    });
});

router.get('/delete_leave/:id',(req,res)=>{
    const id=req.params.id;
    db.getleavebyid(id,(err,result)=>{
       res.render('/delete_leave.ejs',{user:result});
    });
});

router.post('/delete_leave/:id',(req,res)=>{
    const id=req.params.id;
    db.deleteleave(id,(err,result)=>{
        res.redirect('/employee/leave');
    });
});

router.get('/edit_employee/:id',(req,res)=>{
    const id=req.params.id;
    db.getEmpbyId(id,(err,result)=>{
        res.render('edit_employee.ejs',{list:result});
    })
});

router.post('/edit_employee/:id',(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const email=req.body.email;
    const contact=req.body.contact;
    const join_date=req.body.date;
    const role=req.body.role;
    const salary=req.body.salary;
    db.editEmp(id,name,email,contact,join_date,role,salary,(err,result)=>{
        console.log('employee details edited to database');
        res.redirect('/employee');
    })
});

router.get('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    db.getEmpbyId(id,(err,result)=>{
        res.render('/detelte_employee.ejs',{list:result});
    });
});

router.post('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    db.deleteEmp(id,(err,result)=>{
        res.redirect('/employee');
    });
});

router.post('/search',(req,res)=>{
    const key=req.body.search;
    db.searchEmp(key,(err,result)=>{
        console.log(results);
        res.render('employee.ejs',{employee:result});
    })
});

router.post('/add_leave',[
    check('name').notEmpty(),
    check('id').notEmpty(),
    check('leave_type').notEmpty(),
    check('from').notEmpty().withMessage('select a date'),
    check('to').notEmpty().withMessage('select a date'),
    check('reason').notEmpty().withMessage('specify a reason'),
],(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
       return res.status(422).json({error:error.array()});
    }
    db.add_leave(req.body.id,req.body.name,req.body.leave_type,req.body.from,req.body.to,req.body.reason,(err,result)=>{
       res.redirect('/employee/leave');
    })
})

module.exports=router;