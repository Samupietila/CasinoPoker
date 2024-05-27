require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const connectDB = require("./config/db");
const customMiddleware = require("./middleware/customMiddleware");

// express app imported from ./config/db.js
const app = express();
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(customMiddleware.requestLogger);

// Confirming server works
app.get("/", (req, res) => {
  res.send("API is currently Running");
});

// Routes for Users
app.use("/api/users", require("./routers/userRouter"));

// Custom middleware
app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
