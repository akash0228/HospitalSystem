const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const db=require.main.require('./models/db_controller');
const multer=require('multer');
const fs=require('fs');
const path=require('path');

//if not loggined 
router.get('*',(req,res,next)=>{
    if(req.cookies['username']==null){
        res.redirect('/login');
    }else{
         next();
    }
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/assets/images/upload_images");
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});

router.get('/',(req,res)=>{
    db.getAllDoc((err,result)=>{
       if(err){
          throw err;
        }
        else{
           res.render('doctors.ejs',{list:result});
        }
    });
});

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/add_doctor',(req,res)=>{
    db.getalldept((err,result)=>{
        res.render('add_doctor.ejs',{list:result});
    })
});

// add callback here
router.post('/add_doctor',upload.single("image"),(req,res)=>{
    db.add_doctor(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.body.file.filename,req.body.department,req.body.biography)
    if(db.add_doctor){
        console.log('1 doctor inserted');
    }
    res.render('add_doctor');
});

router.get('/edit_doctor/:id',(req,res)=>{
    const id=req.params.id;
    db.getDocById(id,(err,result)=>{
        res.render('edit_doctor.ejs',{list:result});
    })
});

router.post('/edit_doctor/:id',(req,res)=>{
    const id=req.params.id;
    db.editDoctor(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.body.department,req.body.biography,id,
        (err,result)=>{
            if(err) throw err;
            else res.redirect('back');
        })
});

router.get('/delete_doctor/:id',(req,res)=>{
    const id=req.params.id;
    db.getDocById(id,(err,result)=>{
        res.render('delete_doctor.ejs',{list:result});
    })
});

router.post('/delete_doctor/:id',(req,res)=>{
    const id=req.params.id;
    db.deleteDoc(id,(err,result)=>{
        res.redirect('doctor');
    })
});

router.get('/',(req,res)=>{
    db.getAllDoc((err,result)=>{
        if(err) throw err;
        else res.render('doctor.ejs',{list:result});
    })
});

router.post('/search',(req,res)=>{
    const key=req.body.search;
    db.searchDoc(key,(err,result)=>{
        console.log(results);
        res.render('doctor.ejs',{list:result});
    })
})

module.exports=router;

