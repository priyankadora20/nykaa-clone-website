const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error")
const {connection} = require("./Config/db")
const {productRouter} = require("./Routes/productRoute")
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcomea to app");
});


app.use("/products", productRouter);
app.listen(8080, async () => {
  try {
   await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log("Listening on PORT 8080");
});
