const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({ 
        name:{
                required: true,
                type: String
        },
        email:{
                required: true,
                type: String
        },
        phone:{
                type: Number,
                required: true
        },
        password:{
                type:String,
                required: true
        },
        imageUrl:{
                type:String,
                required:true
        },
        imageId:{
                type:String,
                required:true
        }
})

module.exports = mongoose.model("User", userSchema)