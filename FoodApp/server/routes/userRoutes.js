const express = require("express")
const router = express.Router()
const {loginUser,createUser,createOrder,deleteOrder,updateOrder,fetchMyOrders} = require("../controllers/User/users")
router.route("/userOrder")
    .get(fetchMyOrders)
    .post(createOrder)
    .put(updateOrder)
    .delete(deleteOrder)
router.post("/login",loginUser)
router.post("/signup",createUser)

module.exports = router