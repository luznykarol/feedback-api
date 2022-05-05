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

//route middlewares

app.use("/api/user", authRoute);
app.use("/api", tasksRoute);

app.listen(port || 3001);

console.log("app", app);
