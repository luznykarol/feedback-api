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

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
