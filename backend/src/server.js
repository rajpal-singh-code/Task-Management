const express = require("express");
const { connectDB } = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRouter = require("./routes/authModel");
const notesRouter = require("./routes/noteRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-hdcs.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀...");
});

app.use("/", authRouter);
app.use("/api/notes", notesRouter);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
};

startServer();

module.exports = app;
