const express = require("express");

const userRouter = require("./routers/userRouter");
const vendorRouter = require("./routers/vendorRouter");
const reviewRouter = require("./routers/reviewRouter");
const queryRouter = require("./routers/queryRouter");


const app = express();
const port = 5000;

const cors = require("cors");


app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(express.static("./static"));

app.use("/user", userRouter);
app.use("/vendor", vendorRouter);
app.use("/review", reviewRouter);
app.use("/query", queryRouter);

app.get("/", (req, res) => {
  console.log("request on /");
  res.send("response from server");
});

// endpoints or route
app.get("/add", (req, res) => {
  console.log("request on /add");
  res.send("your data has been added!!");
});

// Run the Server
app.listen(port, () => {
  console.log("server started on 5000");
});

