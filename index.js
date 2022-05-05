const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
let port = process.env.PORT;

//import routes
const authRoute = require("./routes/auth");
const tasksRoute = require("./routes/tasks");

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected "));

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      name: "name of your app",
      version: "0.1.0",
    },
  });
});

//middlewares
app.use(express.json());
app.use(cors());
if (port == null || port == "") {
  port = 8000;
}

//route middlewares

app.use("/api/user", authRoute);
app.use("/api", tasksRoute);

app.listen(port || 3001);

console.log("app", app);
