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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

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
