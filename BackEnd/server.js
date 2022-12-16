const app = require("./app");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const connectDatabase = require("./Config/database")
dotenv.config({path:"BackEnd/Config/config.env"})
mongoose.set('strictQuery', false);
connectDatabase()
app.listen(process.env.PORT,()=>{
    console.log(`listening to the port ${8000}`)
})