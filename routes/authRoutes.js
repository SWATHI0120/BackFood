import express from "express";
import Admin from "../models/Admin.js";
import Customer from "../models/Customer.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const Model = role === "admin" ? Admin : Customer;

    const exists = await Model.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new Model({ name, email, password });
    await user.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const Model = role === "admin" ? Admin : Customer;

    const user = await Model.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;