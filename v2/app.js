const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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
module.exports = app