const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");
require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

// /live route
app.get("/live", (req, res) => {
  res.send("lecha ra pumka");
});

// Default route for unmatched requests
app.use((req, res) => {
  res.send("dobey ra");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Cron job to ping the server every 14 minutes
cron.schedule("*/14 * * * *", () => {
  axios.get("https://linktree-mg98.onrender.com/live")
    .then(() => console.log("Server pinged to keep it active"))
    .catch(err => console.error("Error pinging server:", err.message));
});
