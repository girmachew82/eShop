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
    .select("name price _id")
    .exec()
    .then(docs => {
      /*
      const result = {
        result:"reefeee"
        //count: products.length,
        
        productss: products.map(product =>{
          return{
            name : product.name,
            price: product.price,
            _id:   product._id,
            request:{
              type: 'GET',
              url: 'http://localhost:3000/api/products/'+product._id
            }
          }
        })
        
       }
       */
       
      if (docs.length >= 0) {

        res.status(200).json({
          // message:"Products",
          // body:docs
          count: docs.length,
          products: docs.map(doc =>{
           return{
            name:doc.name,
            price: doc.price,
            _id: doc._id,
            request:{
              type:'GET',
              url:"http://loclahost:3000/api/products/"+doc._id
            }
           }
          })
          
        });
        
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
      
    })
    .catch(err => {
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
  if (!req.body.name) {
    res.status(404).json({
      message: "Product name is required",
    });
  } else if (!req.body.price) {
    res.status(404).json({
      message: "Product price is required",
    });
  } else {
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
            name: product.name,
            price: product.price,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
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
  Product.findById(id)
    .select("name price")
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          product:result,
          request:{
            type:"GET",
            description:"GET all products",
            url:"http://localhost:3000/api/products"
          }
        });
      } else {
        res.status(500).json({
          message: "Product not found",
        });
      }
    })
    .catch(err=>{
        res.status(500).json({
            error:"Incorrect ID"
        })
    })
});
router.patch("/:productId", (req, res, next) => {
  /*
  const id = req.params.productId;
  res.status(200).json({
    message: "Update product of ID " + id,
  });
  */
  const id = req.params.productId;
  if(!req.body){
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "Updated successfully",
          request:{
            type:"GET",
            url:"http://localhost:3000/api/products/"+id
          }
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}else{
    res.status(500).json({
        error:"Body could not be empty"
    })
}
});
router.delete("/:productId", (req, res, next) => {
  /*
  const id = req.params.productId;
  res.status(200).json({
    message: "Delete product " + id,
  });
  */
  const id = req.params.productId;


  if(id){
  Product.findById(id)
    .exec()
    .then((product) => {
      if (product) {
        Product.deleteOne({ _id: id })
          .exec()
          .then((result) => {
            if (result) {
              res.status(200).json({
                message: "Product deleted successfully",
                request:{
                  type:"POST",
                  url:"http:/localhost:3000/products",
                  body:{name:'String', price:'Number'}
                }
              });
            } else {
              res.status(404).json({
                message: "Product not found",
              });
            }
          });
      } else {
        res.status(500).json({
          message: "Product not found",
        });
      }
    })
    .catch(err=>{
        res.status(404).json({
            error:"ID required"
        })
    })
}else{
    res.status(404).json({
        message:"Product ID is required"
    })
}


});

module.exports = router;
