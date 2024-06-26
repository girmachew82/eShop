const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')
//endpoints 
router.get('/',(req, res, next)=>{
    Product.find()
    .exec()
    .then(docs =>{
        console.log(docs)
        if(docs.length >= 0){
            res.status(200).json(docs)
        }else{
            res.status(404).json({
                message:"Product not found"
            })
        }
    })
    .catch()
    res.status(200).json({
        message:"Handling GET request to /products"
    })
})
router.post('/',(req, res, next)=>{
    const product= {
        name:req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message:"Product created",
        createdProduct: product
    })
})
router.get('/:productId',(req, res, next)=>{
    const id = req.params.productId
    if(id ==='special'){
    res.status(200).json({
        message:"You discover product of special ID "+id
    })
}else{
    res.status(200).json({
        message:"You pass an ID "+id
    })
}
})
router.patch('/:productId',(req, res, next)=>{
    const id = req.params.productId
    res.status(200).json({
        message:"Update product of ID "+id
    })
})
router.delete('/:productId',(req, res, next)=>{
    const id = req.params.productId
    res.status(200).json({
        message:"Delete product "+ id
    })
})

module.exports = router