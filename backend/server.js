const app = require("./app")
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"})


app.listen(process.env.Port, ()=>{
    console.log(`server is working on port ${process.env.Port}`)
})