import express from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const user = new User({ email, password, firstName, lastName });
  await user.save();

  res.status(201).json({ message: 'User registered successfully', userId: user._id });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Validate password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

router.post("/verifyToken", async (req, res) => {
  try {
      const { token } = req.body;

      const validity = jwt.verify(token, process.env.JWT_SECRET);

      if (!validity) {
          throw new Error("Token Not Valid");
      }

      res.status(200).send({
          message: "Valid User",
      });
  } catch (error) {
      res.status(401).send({
          message: "UnAuthorized Token",
      });
  }
});

export default router;