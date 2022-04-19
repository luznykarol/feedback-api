const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//import routes
const authRoute = require("./routes/auth");
const tasksRoute = require("./routes/tasks");

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected "));

//middlewares
app.use(express.json());

//route middlewares

app.use("/api/user", authRoute);
app.use("/api/tasks", tasksRoute);

app.listen(3001, () => console.log("SERVER RUNNING"));
