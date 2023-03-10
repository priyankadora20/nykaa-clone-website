const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
//Handling Uncaught Exception
process.on("uncaughtException", err=> console.log(`Err: ${err.message}`))
const {connection} = require("./Config/db")
const {productRouter} = require("./Routes/productRoute");
const { userRouter } = require("./Routes/userRoute");
app.use(express.json());

app.use(cookieParser())


app.get("/", (req, res) => {
   return res.send("Welcomea to app");
});



app.use("/products", productRouter);
app.use("/user", userRouter)

const server = app.listen(8080, async () => {
  try {
   await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log("Listening on PORT 8080");
});

//Unhandled Promise Rejection //when mongodb ka error/ / shutdown asap server
process.on("unhandledRejection", err=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`)

  server.close(()=>{
    process.exit(1)
  })
})