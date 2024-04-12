const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

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
mongoose.connect('mongodb://localhost:27017/eShop',)
.then(()=>{
    console.log("Connected to the database")
})
.catch(()=>{
    console.log("Connection failed")
})

app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('*' ,(req, res)=>{
    res.status(404).json({
        message:"Resourse not found"
    })
})
module.exports = app