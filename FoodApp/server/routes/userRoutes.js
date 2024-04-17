const express = require("express")
const router = express.Router()
const {loginUser,createUser,createOrder,deleteOrder,updateOrder,fetchMyOrders} = require("../controllers/User/users")
const verifyAccessToken = require("../middleware/verifyJwt")
router.post("/login",loginUser)
router.post("/signup",createUser)
// Middleware attached to the router
router.use(verifyAccessToken);
router.route("/userOrder")
    .get(fetchMyOrders)
    .post(createOrder)
    .put(updateOrder)
    .delete(deleteOrder)
module.exports = router