const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/eshop")
const productRoute = require('./api/routes/products')
const orderRoute = require('./api/routes/orders')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
//Testing 
/*
app.use((req, res, next) =>{
    res.status(200).json({
        message:"It works"
    })
})
*/

app.use('/products', productRoute)
app.use('/orders', orderRoute)
app.use('*',(req, res)=>{
    res.status(404).json({
        message:"Resource not found"
    })
})
module.exports = app