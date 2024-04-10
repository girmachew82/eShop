const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const product = require("../models/product");

router.get("/", (req, res, next) => {
  /*
    res.status(200).json({
        message:"Handling GET request to /orders"
    })
    */
  Order.find()
    .select("product quantity _id")
    .populate('product','name')
    .exec()
    .then((orders) => {
      if (orders) {
        res.status(200).json({
          count: orders.length,
          orderss: orders.map((order) => {
            return {
                _id: order._id,
              product: order.product,
              quantity: order.quantity,
             
              request: {
                type: "GET",
                url: "http://localhost:3000/api/orders/" + order._id,
              },
            };
          }),
        });
      } else {
        res.status(404).json({
          message: "Order not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/", (req, res, next) => {
  /*
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
    */
  if (req.body.productId) {
    Product.findById(req.body.productId)
      .then((product) => {
        if (!product) {
          res.status(404).json({
            message: "Product not found",
          });
        }
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          product: req.body.productId,
          quantity: req.body.quantity,
        });
        return order.save();
      })
      .then((result) => {
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity,
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/api/orders/" + result._id,
          },
        });
      })
      .catch((err) => {
        res.status(404).json({
          error: "Product not found",
        });
      });
  } else {
    res.status(404).json({
      message: "Product ID is required",
    });
  }
});
router.get("/:orderId", (req, res, next) => {
  /*
    const id = req.params.orderId
    res.status(200).json({
        message:"Discovering order of ID "+id
    })
    */
  const id = req.params.orderId;
  Order.findById({_id:id})
  .populate('product','name')
    .exec()
    .then((order) => {
      res.status(200).json({
        _id: order._id,
        product: order.product,
        quantity: order.quantity,
        request: {
          type: "GET",
          url: "http://localhost:3000/api/orders",
        },
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: "Order not found",
      });
    });
});
router.delete("/:orderId", (req, res, next) => {
  /*
    const id = req.params.orderId
    res.status(200).json({
        message:"Deleting order of ID  "+id
    })
    */
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .exec()
    .then((del) => {
      res.status(200).json({
        message: "Deleted successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        error: "Order not found",
      });
    });
});

module.exports = router;
