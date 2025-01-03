const express = require('express')
const cors  = require('cors')
const mongoose  = require("mongoose")

const userRoute = require('./routes/user')
const coursesRoute = require('./routes/courses')
const studentRoute = require('./routes/student')
const feeRoute = require('./routes/fee')

const fileUpload = require('express-fileupload')
const bodyPaser = require('body-parser')
mongoose.connect('mongodb://127.0.0.1:27017/Schoolapp')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyPaser.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use(userRoute)
app.use(coursesRoute)
app.use(studentRoute)
app.use(feeRoute)


app.listen(3011,()=>{
    console.log("http://localhost:3011")
})
