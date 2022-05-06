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

mongoose.connect(process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("MongoDB is Connected...");
// mongoose.connect(process.env.DB_CONNECT, () => console.log("connected "));

//middlewares
app.use(express.json());

// cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://taskbakend.herokuapp.com/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//route middlewares

app.use("/api/user", authRoute);
app.use("/api", tasksRoute);

app.listen(port, () => console.log("SERVER RUNNING"));

console.log("app", app);
