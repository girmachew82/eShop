const express = require("express");
const router = express.Router();
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const productControllers = require('../controllers/productController')
const path = require('path')
//const upload = multer({dest: 'uploads/'})

const Storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'productImages/')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString()+path.extname(file.originalname))
  }
})
const fileFilter  = (req, file, cb) =>{
  if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png' || file.mimetype ==='image/jpg') 
  cb(null, true)
  else
  cb(null, false)
}
const upload = multer({dest: 'uploads/', limits:{fieldSize: 1024 * 1024 *1}, fileFilter})
//const upload = multer({storage: Storage, limits:{fieldSize: 1024 * 1024 *5}, fileFilter})
//endpoints
router.get("/", checkAuth, productControllers.products_get_all);
router.post("/", upload.single("productImage"),checkAuth,productControllers.product_create_product);
router.get("/:productId", checkAuth, productControllers.products_get_product_by_Id);
router.patch("/:productId", checkAuth, productControllers.products_update_product);
router.delete("/:productId", checkAuth, productControllers.products_delete_product);

module.exports = router;
