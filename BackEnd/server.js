const app = require("./app");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const connectDatabase = require("./Config/database")
//handling Uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error :n${err.message}`);
    console.log(err.stack)
    console.log("Shuting down the server duo to uncaught Exception")
    process.exit(1)
})
//config
dotenv.config({path:"BackEnd/Config/config.env"})
mongoose.set('strictQuery', false);

//connnection to database
connectDatabase()
const server = app.listen(process.env.PORT,()=>{
    console.log(`listening to the port ${process.env.PORT}`)
})

//unhandled server error 
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shuting down the server due to unhandled Promise Rejetion");
    server.close(()=>{
        process.exit(1)
    })
})