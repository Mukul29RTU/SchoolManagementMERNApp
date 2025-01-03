const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Students = require("../models/Students");
const Fees = require("../models/Fees");
const Courses = require("../models/Courses");
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const checkAuth = require('../middleware/checkAuth')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

router.post('/addstudent',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"mukul garg")

    cloudinary.uploader.upload(req.files.image.tempFilePath, (err,result) => {
        const newStudent = new Students({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            father: req.body.father,
            address: req.body.address,
            courseId: req.body.courseId,
            uId: verify.uId,
            imageUrl: result.secure_url,
            imageId: result.public_id,
        });
        newStudent.save()
        .then(result=>{
            res.status(200).json({
                msg:"Student Add"
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    })
})  

router.get('/allstudent',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")

    Students.find({uId:verify.uId})
    .then(result=>{
        res.status(200).json({
            Students:result
        })
    })

})

router.get('/allstudent/:courseId',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")

    Students.find({uId:verify.uId,courseId:req.params.courseId})
    .then(result=>{
        res.status(200).json({
            Students:result
        })
    })
})


router.get('/studentdetail/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")

    Students.find({uId:verify.uId})
    .then(result=>{
        Students.findById(req.params.id)
        .then(student =>{
            const fee = Fees.find({phone:student.phone})
            .then(fee => {
                const course = fee.map(list => list.courseId)
                Courses.find({ _id: { $in: course } })
                .then(course=>{
                    res.status(200).json({
                        Student:student,
                        Fee:fee,
                        Course:course
                    })
                })
                
            })
            
        })
       
    })
})


router.delete('/delete/:id',checkAuth,(req,res)=>{
  
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")
    

    Students.findById(req.params.id)
    .then(student=>{
        if(student.uId == verify.uId){
            Students.findByIdAndDelete(req.params.id)
            .then(result=>{
                cloudinary.uploader.destroy(student.imageId,(deletedImage)=>{
                    res.status(200).json({
                        msg:"Student Deleted"
                    })
                })
            })
            .catch(error =>{
                res.status(500).json({
                    error:error
                })
            })
        }
    })

})

router.put('/update/:id', checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "mukul garg");
  Students.findById(req.params.id)
  .then(student => {
    if (verify.uId !== student.uId) {
        return  res.status(500).json({
            msg :"not eligible to change"
        })
    }
    else if(req.files){
        cloudinary.uploader.destroy(student.imageId,(deletedImage)=>{
            cloudinary.uploader.upload(req.files.image.tempFilePath,(err,result)=>{
                const newUpdatedStudent = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    father: req.body.father,
                    address: req.body.address,
                    courseId: req.body.courseId,
                    uId: verify.uId,
                    imageUrl: result.secure_url,
                    imageId: result.public_id,
                }
                Students.findByIdAndUpdate(req.params.id,newUpdatedStudent,{new:true})
                .then(result=>{
                    res.status(200).json({
                        newUpdatedStudent: result
                    })
                   
                })
                .catch(err =>{
                    res.status(200).json({
                      error:err
                    })
                    
                }
                )
            })
        })
    }
    else{
        const updatedStudent = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            father: req.body.father,
            address: req.body.address,
            courseId: req.body.courseId,
            uId: verify.uId,
            imageUrl: student.imageUrl,
            imageId: student.imageId,
        }
        Students.findByIdAndUpdate(req.params.id,updatedStudent,{new:true})
        .then(result=>{
            res.status(200).json({
                updatedStudent: result
            })
           
        })
        .catch(err =>{
            res.status(200).json({
              error:err
            })
            
        }
        )
    }
   
  })
});


// latest 5 student to display

router.get('/lateststudents',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"mukul garg")

    Students.find({uId:verify.uId})
    .sort({$natural:-1}).limit(5)
    .then(student=>{
        res.status(200).json({
            data:student
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;