const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoute = require('./api/routes/products')
const orderRoute = require('./api/routes/orders')
const userRoute = require('./api/routes/users')
require('dotenv').config()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
/*
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
})
*/
//Testing 
/*
app.use((req, res, next) =>{
    res.status(200).json({
        message:"It works"
    })
})
*/
mongoose.connect('mongodb://localhost:27017/eShop',)
.then(()=>{
    console.log("Connected to the database")
})
.catch(()=>{
    console.log("Connection failed")
})
app.use('/uploads',express.static('uploads'))
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/users', userRoute)

app.use('*' ,(req, res)=>{
    res.status(404).json({
        message:"Resourse not found"
    })
})
module.exports = app