const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


const {router1} = require('./Routes/posts')
const {router} = require('./Routes/users')

const bodyParser = require('body-Parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT;

app.use("/", router)
app.use("/",router1)

app.use((req, res, next)=>{
    const error = new Error("Error");
    error.status = 404
    next(error)
})

app.use((err, req, res, next)=>{
    res.json({
        status:err.status,
        success: false,
        message: err.message
    })
})


app.listen(port,()=>{
    console.log(`Backend server is running on http://localhost:${port}`)
})
