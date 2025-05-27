const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format. Please provide a valid email address.",
      });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error:
          "Email already registered. Please use a different email address.",
      });
    }
    const user = await User.create({ email, password, role });
    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format. Please provide a valid email address.",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Password is required.",
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
