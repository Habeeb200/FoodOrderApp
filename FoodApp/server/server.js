const express = require("express")
const dbConn = require("./config/dbConn")
const app = express()
const PORT  = process.env.PORT || 3500
const mongoose = require("mongoose")
const cors = require("cors")
const handleError = require("./middleware/errorHandler")
const corsOption = require("./middleware/cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
dbConn()
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.use("/admin",require("./routes/adminRoutes"))
app.use("/user",require("./routes/userRoutes"))
app.use("/rider",require("./routes/riderRoutes"))
mongoose.connection.once("open",()=>{
    console.log("Database connected to successfully");
    app.listen(PORT,()=>{
        console.log(`Server already running at port ${PORT}`);
    })
})
app.use(handleError)
