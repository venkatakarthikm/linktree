const Link = require("../models/Link");
const User = require("../models/User");

exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find({ userId: req.params.userId }).sort({ order: 1 });
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addLink = async (req, res) => {
    try {
        const { userId, name, url, order } = req.body;

        // Validate input
        if (!userId || !name || !url) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new link
        const newLink = new Link({ userId, name, url, order });
        await newLink.save();

        res.json(newLink);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        await Link.findByIdAndDelete(req.params.id);
        res.json({ message: "Link deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { links } = req.body;
        for (let link of links) {
            await Link.findByIdAndUpdate(link._id, { order: link.order });
        }
        res.json({ message: "Order updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLinksByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Fetch links for the user
        const links = await Link.find({ userId: user._id }).sort({ order: 1 });
        res.json(links);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, url } = req.body;

        // Update the link by ID
        const updatedLink = await Link.findByIdAndUpdate(
            id,
            { name, url },
            { new: true } // Return the updated document
        );

        if (!updatedLink) return res.status(404).json({ message: "Link not found" });

        res.json(updatedLink);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};