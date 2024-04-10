const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
router.get('/',(req, res, next) =>{
   /*
    res.status(200).json({
        message:"Handling GET request to /orders"
    })
    */
Order
.find({})
.exec()
.then(order =>{
    if(order){
        res.status(200).json({
            order
        })
    }else{
        res.status(404).json({
            message:"Order not found"
        })
    }
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
})

})
router.post('/',(req, res, next) =>{
    const order ={
        productId:req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"Handling POST request to /orders",
        orderCreated:{
            order:order
        }
    })
})
router.get('/:orderId',(req, res, next) =>{
    const id = req.params.orderId
    res.status(200).json({
        message:"Discovering order of ID "+id
    })
})
router.delete('/:orderId',(req, res, next) =>{
    const id = req.params.orderId
    res.status(200).json({
        message:"Deleting order of ID  "+id
    })
})

module.exports = router