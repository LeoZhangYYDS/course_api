const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const categories = require("./routes/category-route");
const courses = require("./routes/course-route");
const users = require("./routes/user-route");
const auth = require("./routes/auth-route");
const cors = require("cors");

//connect to mongodb
async function connect() {
  try {
    const connectionResult = await mongoose.connect(process.env.DB_CONNECT);
    if (connectionResult) console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connection failed", err);
  }
}
connect();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/categories", categories);
app.use("/api/courses", courses);
app.use("/api/users", users);
app.use("/api/auth", auth);

//local host
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
