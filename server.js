const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/blog", blogRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Wanda is running!");
});

app.listen(port, () => {
  console.log(`Wanda is sitting on port ${port}`);
});
