const express =  require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error")
const app = express();
app.use(express.json())
app.use(cookieParser())

//routes for Product
const product = require("./routes/productRoute");
app.use("/api/v1",product)

//routes for user
const user = require("./routes/userRoute");
app.use("/api/v1",user)

//middleware for errors
app.use(errorHandler)

module.exports = app;