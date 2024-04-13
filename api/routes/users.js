const mongoose  = require('mongoose')
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt  = require('bcrypt')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
router.get('/',(req, res, next)=>{
    User.find()
    .exec()
    .then(users =>{
        res.status(200).json({
        usr : user.map(user =>{
            return{
            _id: user._id,
            email: user.email
            }
        })
        })
    })
    .catch(err =>{
        error:err
    })
    
})
router.post('/signup',(req, res, next) =>{
  User.find({email: req.body.email})
  .exec()
  .then(user =>{
    if(user.length >= 1){
        return res.status(409).json({
            error:"Mail exist"
        })
    }else{
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
                .save()
                .then(result =>{
                    res.status(200).json({
                        _id:result._id,
                        email:result.email
                    })
                })
        
            }
        })

    }
  })
  .catch(err =>{
    res.status(500).json({
        error:err
    })
  })

})

router.post('/signin',(req, res, next) =>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(404).json({
                message:"Auth failed"
            })
        }else{
            bcrypt.compare(req.body.password, user[0].password,(err, result) =>{
                if(err){
                    return res.status(401).json({
                        message:"Auth failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                      email: user[0].email,
                      userId: user[0]._id  
                    }, process.env.JWT_KEY,{
                        expiresIn:"1h"
                    })
                    return res.status(200).json({
                        message:"Sign in",
                        token: token
                    })
                }

                res.status(401).json({
                    error:err
                })
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})
router.delete('/',(req, res, next) =>{
    User.remove({_id:req.params.id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"User deleted"
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router