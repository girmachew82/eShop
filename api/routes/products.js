const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
//endpoints
router.get("/", (req, res, next) => {
  /*
    res.status(200).json({
        message:"Handling GET request to /products"
    })
    */
  Product.find()
   .select('name price')
    .exec()
    .then(products => {
      //console.log(products);
      if (products.length >= 0) {
        res.status(200).json({
          // message:"Products",
          // body:docs
          products
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        error: err,
      });
    });
});
router.post("/", (req, res, next) => {
  /*
    const product= {
        name:req.body.name,
        price: req.body.price
    }
       res.status(200).json({
        message:"Product created",
        createdProduct: product
    })
    */
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created",
        createdProduct: {
          product,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  /*
  if (id === "special") {
    res.status(200).json({
      message: "You discover product of special ID " + id,
    });
  } else {
    res.status(200).json({
      message: "You pass an ID " + id,
    });
  }
  */
 Product
 .findById(id)
 .select('name price')
 .exec()
 .then(product =>{
    if(product){
        res.status(200).json({
            product
        })
    }else{
        res.status(500).json({
            message:"Product not found"
        })
    }

 })

});
router.patch("/:productId", (req, res, next) => {
    /*
  const id = req.params.productId;
  res.status(200).json({
    message: "Update product of ID " + id,
  });
  */
const id = req.params.productId
const updateOps = {}
for(const ops of req.body){
    updateOps[ops.propName] = ops.value
}
Product.updateOne(
    {_id:id},
    {$set:updateOps})
    .exec()
    .then(result=>{
        if(result){
            res.status(201).json({
                message:"Updated successfully"
            })
        }else{
            res.status(404).json({
                message:"Product not found"
            })
        }
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
});
router.delete("/:productId", (req, res, next) => {
/*
  const id = req.params.productId;
  res.status(200).json({
    message: "Delete product " + id,
  });
  */
 const id = req.params.productId
 Product
 .findById(id)
 .exec()
 .then(product =>{
    if(product){
    Product
    .deleteOne({_id: id})
    .exec()
    .then(result =>{
        if(result){
            res.status(200).json({
                message:"Product deleted successfully"
            })
        }else{
            res.status(404).json({
                message:"Product not found"
            })
        }
    })
}else{
    res.status(500).json({
        message:"Product not found"
    })
}
 })

});

module.exports = router;
