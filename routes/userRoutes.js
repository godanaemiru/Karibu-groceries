const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Assuming you added JWT logic from previous step

/**
 * @swagger
 * /users/login:
 * post:
 * summary: User Login
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [username, password]
 * properties:
 * username:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login successful
 * 401:
 * description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      // Generate Token using the secret from .env
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /users/register:
 * post:
 * summary: Register a new user
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * username:
 * type: string
 * password:
 * type: string
 * role:
 * type: string
 * enum: [Manager, Sales Agent]
 * responses:
 * 201:
 * description: User created
 */
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
