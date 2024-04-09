const express = require('express')
const router = express.Router()

router.get('/',(req, res, next) =>{
    res.status(200).json({
        message:"Handling GET request to /orders"
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