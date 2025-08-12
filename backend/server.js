require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDatabase = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");


// Intialization of APP 
const app = express();

const PORT = process.env.PORT || 8000

// Connect to Database 

connectToDatabase()

// Middleware to handle CORS 
app.use(cors({
    origin:process.env.CLIENT_URL || "*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
})
);

// Middleware 
app.use(express.json())

// Routes 
app.get("/", (req, res) => {
    res.send("Welcome to Task Manager API");
});

// API Routes 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Server Upload Folder 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})

