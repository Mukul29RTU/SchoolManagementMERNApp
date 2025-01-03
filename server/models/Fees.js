const mongoose = require("mongoose");
// const express = require('express')

const FeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    courseId:{
        type:String,
        required: true,
    },
    ammount:{
        type:String,
        required: true,
    },
    remark:{
        type:String,
        required: true,
    },
    uId:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Fee", FeeSchema);
