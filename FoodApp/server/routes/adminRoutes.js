const express = require("express")
const router = express.Router()
const {getAllUserOrder,createUserOrder,updateUserOrder,deleteUserOrder} = require("../controllers/Admin/orderController")
const {getAllProduct,getAllProductCategory,getAllProductName,addProduct,updateProduct,deleteProduct} = require("../controllers/Admin/products")
const {getAllRider,createRider,updateRider,deleteRider}  = require("../controllers/Admin/riderController")
const {getAllUser,createUser,updateUser,deleteUser} = require("../controllers/Admin/userController")
router.route("/order")
    .get(getAllUserOrder)
    .post(createUserOrder)
    .put(updateUserOrder)
    .delete(deleteUserOrder)
router.route("/products")
    .get(getAllProduct)
    .post(addProduct)
    .put(updateProduct)
    .delete(deleteProduct)
router.get("/products/:category",getAllProductCategory)
router.get("/products/name/:name",getAllProductName)
router.route("/rider")
    .get(getAllRider)
    .post(createRider)
    .put(updateRider)
    .delete(deleteRider)
router.route("/user")
    .get(getAllUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router