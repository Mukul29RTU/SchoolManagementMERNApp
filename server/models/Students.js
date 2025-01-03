const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, 
        },
        email: {
            type: String,
        },
        phone: {
            type: Number, 
            required: true,
            min: 0, 
        },
        address: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
          },
          imageId: {
            type: String,
            required: true,
          },
          courseId:{
            type: String,
         
          },
          uId:{
            type: String,
            required:true,
          }
    
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
