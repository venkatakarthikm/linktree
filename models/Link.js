const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, required: true },
});

module.exports = mongoose.model("Link", LinkSchema);