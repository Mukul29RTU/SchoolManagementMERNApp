const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required:true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    startdate: {
      type: String,
      required: true,
    },
    enddate: {
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
    uId:{
      type: String,
      required:true
    }
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Course", CourseSchema);
