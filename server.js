const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));