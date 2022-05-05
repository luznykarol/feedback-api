const express = require("express");
const app = express();
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

//middlewares
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("App is running on port " + port);
});

//route middlewares

app.use("/api/user", authRoute);
app.use("/api", tasksRoute);

app.listen(3001, () => console.log("SERVER RUNNING"));

console.log("app", app);
