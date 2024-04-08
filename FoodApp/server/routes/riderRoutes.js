const express = require("express")
const router = express.Router()

const {loginRider,seeRiderTask,updateTransaction} = require("../controllers/Rider/rider")

router.post("/login",loginRider)
router.post("/task",seeRiderTask)
router.post("/update",updateTransaction)

module.exports = router