const express = require('express')
const router = express.Router()

//endpoints 
router.get('/',(req, res, next)=>{
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