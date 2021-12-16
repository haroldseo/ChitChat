const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);

app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}`);
});
