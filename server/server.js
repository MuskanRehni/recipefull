import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Add .js extension for ES modules
import userRoutes from "./routes/userroutes.js"; // Add .js extension for ES modules
import loginroutes from "./routes/loginroutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin",process.env.CLIENT_URL);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});


// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use("/api/users", loginroutes);
// Connect to the database
connectDB();

// Routes
app.use(express.static("./uploads"));
app.use("/api/user", userRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the User API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});