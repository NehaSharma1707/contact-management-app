const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Add contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone });
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.log("Error saving contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update contact
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log("Error updating contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.log("Error deleting contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;