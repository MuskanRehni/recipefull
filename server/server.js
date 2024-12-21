import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
 // Add `.js` extension for ES modules
import userRoutes from './routes/userroutes.js'; // Add `.js` extension for ES modules

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data

// Connect to the database
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
