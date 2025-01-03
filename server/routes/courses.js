const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Courses = require("../models/Courses")
const Students = require("../models/Students")
const checkAuth = require('../middleware/checkAuth')
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken') 
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


router.post('/addcourse',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "mukul garg");

    cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
      const newCourse = new Courses({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        uId: verify.uId,
        imageUrl: result.secure_url,
        imageId: result.public_id,
      });
      newCourse
        .save()
        .then((result) => {
          res.status(200).json({newCourse: result,});
        })
        .catch((err) => {
          res.status(500).json({
            error: err
          });
        });
    });
})

router.get('/allcourse',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "mukul garg");

    Courses.find({uId:verify.uId})
    .then(result=>{
        res.status(201).json({
            course:result 
        })
    }) 
    .catch(err=>{
      res.status.json({
        msg: "No course"
      })
    })
})

router.get('/course-detail/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "mukul garg");

    Courses.findById(req.params.id)
    .then(result=>{
        Students.find({courseId:req.params.id})
        .then(student=>{
          res.status(201).json({
            course:result,
            studentList:student
        })
        })
    })
    .catch(err=>{
        res.status(501).json({
            msg:"No data"
        })
    })
})

router.delete('/:id',checkAuth,(req,res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "mukul garg");

  Courses.findById(req.params.id)
  .then(course=>{ 
      if(course.uId == verify.uId ){
        Courses.findByIdAndDelete(req.params.id)
        .then(result=>{
          cloudinary.uploader.destroy(course.imageId,(deletedImage)=>{
              res.status(200).json({
                result: result
              })
          })
        })
        .catch(err=>{
          res.status(500).json({
            msg: err
          })
        })
      }
  })

})

router.put('/course/:id',checkAuth,(req,res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "mukul garg");

  Courses.findById(req.params.id)
  .then(course=>{
    if(course.uId != verify.uId){
      return res.status(500).json({
        error: "Not valid user"
      })
    }
    else if(req.files){

      cloudinary.uploader.destroy(course.imageId,(deletedImage)=>{
        cloudinary.uploader.upload(req.files.image.tempFilePath,(err,updateImg)=>{
          const updatedCourse = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            uId: verify.uId,
            imageUrl: updateImg.secure_url,
            imageId: updateImg.public_id,
          }

          Courses.findByIdAndUpdate(req.params.id,updatedCourse,{new:true})
          .then(data=>{
            res.status(200).json({
              updatedCourse:data
            })
            // .catch(err => {
            //   res.status(500).json({
            //     error:err
            //   })
            // })
          })
        })
      })
     
    }
    else{
      const updatedData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        uId: verify.uId,
        imageUrl: course.imageUrl,
        imageId: course.imageId,
      }

      Courses.findByIdAndUpdate(req.params.id,updatedData,{new:true})
      .then(data=>{
        res.status(201).json({
          updatedData:data
        })
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      }
      )
    }
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})

// latest 5 course to display
router.get('/latestcourse',checkAuth,(req,res)=>{
  const token = req.headers.authorization.split(" ")[1]
  const verify = jwt.verify(token,"mukul garg")

  Courses.find({uId:verify.uId})
  .sort({$natural:-1}).limit(5)
  .then(course=>{
      res.status(200).json({
          course:course
      })
  })
  .catch(err=>{
      res.status(500).json({
          error:err
      })
  })
})

module.exports = router;