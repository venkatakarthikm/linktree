// routes/linkRoutes.js
const express = require("express");
const { getLinks, addLink, deleteLink, updateOrder, getLinksByUsername,updateLink } = require("../controllers/linkController");
const router = express.Router();

// Fetch links by userId
router.get("/:userId", getLinks);

// Fetch links by username
router.get("/user/:username", getLinksByUsername);

// Add, delete, and update links
router.post("/add", addLink);
router.delete("/:id", deleteLink);
router.post("/update-order", updateOrder);
// Edit a specific link
router.put("/:id", updateLink);

module.exports = router;