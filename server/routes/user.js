const express = require('express')
const router = express.Router()
const User = require("../models/User")
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const checkAuth = require('../middleware/checkAuth');
require('dotenv').config();



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length > 0) {
      res.status(500).json({
        error: "email already register",
      });
      
    }else{
        cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                res.status(500).json({
                  error: err,
                });
              } else {
                const newUser = new User({
                  name: req.body.name,
                  email: req.body.email,
                  phone: req.body.phone,
                  password: hash,
                  imageUrl: result.secure_url,
                  imageId: result.public_id,
                });
                newUser
                  .save()
                  .then((result) => {
                    res.status(200).json({
                      newUser: result,
                      message:"Register Success"
                    });
                  })
                  .catch((err) => {
                    // console.log(err);
                    res.status(500).json({
                      error: err,
                    });
                  });
              }
            });
          });
    }
  });

});

router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .then(users=>{
        if(users === 0){
            return res.status(500).json({
                message: "email not registered"
            })
        }else{
               bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
            if(!result){
                return res.status(500).json({
                    error: "incorrect password"
                })
            }
            const token = jwt.sign({
                email:users[0].email,
                name:users[0].name,
                uId: users[0]._id
            },
            'mukul garg',
            {
                expiresIn: '365d'
            }
        );
        res.status(200).json({
            _id:users[0]._id,
            name: users[0].name,
            email: users[0].email,
            imageUrl:users[0].imageUrl,
            phone: users[0].phone,
            imageId:users[0].imageId,
            token:token,
            message:"Login Successfully"
        })
        })
        }

    })

});

module.exports = router;