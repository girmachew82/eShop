const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const orderControllers = require('../controllers/orderController')


router.get("/", checkAuth,orderControllers.orders_get_all);
router.post("/", checkAuth, orderControllers.orders_create_order);
router.get("/:orderId", checkAuth, orderControllers.orders_get_order_by_id);
router.delete("/:orderId", checkAuth, orderControllers.orders_delete_order);

module.exports = router;
