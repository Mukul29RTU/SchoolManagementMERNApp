const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Fees = require("../models/Fees")
const Students = require("../models/Students")
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken') 


router.post('/addfee',checkAuth,(req,res)=>{

    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "mukul garg");

    const newFee = new Fees({
        name: req.body.name,
          email:req.body.email,
          phone: req.body.phone,
          courseId:req.body.courseId,
          ammount:req.body.ammount,
          remark:req.body.remark,
          uId:verify.uId
      });
      Students.find({uId:verify.uId,phone:req.body.phone,name:req.body.name})
      .then(result =>{
        if(result[0].phone && result[0].name){
            newFee
            .save()
            .then((result) => {
              res.status(200).json({
                msg:"Fee added"
              });
            })
            .catch(err =>{
                res.status(500).json({
                        error:err
                  });
            })
        }
      })
      .catch(err=>{
        res.status(500).json({
            error:err
        })
      })   
})



router.get('/fee-history',checkAuth,(req,res)=>{

    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "mukul garg");

    Fees.find({uId:verify.uId})
    .then(result=>{
            res.status(200).json({
                feeHistory: result
            })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})



// payment by one student 

router.get('/singlefee',checkAuth,(req,res)=>{
    
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "mukul garg");

    Fees.find({uId:verify.uId,courseId:req.query.courseId,phone:req.query.phone})
    .then(result=>{
        res.status(200).json({
            fee:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

})

router.delete('/fee-history/delete/:id',checkAuth,(req,res)=>{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token,"mukul garg");

        Fees.findById(req.params.id)
        .then(fee=>{
            
            if(fee.uId == verify.uId){
                Fees.findByIdAndDelete(req.params.id)
                .then(result=>{
                    res.status(200).json({
                        msg:"Payment Deleted"
                    })
                })
                .catch(err =>{
                    res.status(500).json({
                        error:err
                    })
                    
                })
            }
            
        })
})

module.exports = router;