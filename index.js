const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

//import routes
const authRoute = require("./routes/auth");
const tasksRoute = require("./routes/tasks");

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected "));

const mongoose_db = mongoose.connection;

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

//route middlewares

app.use("/api/user", authRoute);
app.use("/api", tasksRoute);

mongoose_db.once("open", function () {
  app.listen(port, () => {
    console.log("Server Listening on Port", port);
  });
});

mongoose_db.on("error", function () {
  console.error("database failed to open");
});

console.log("app", app);
