import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Test Route
app.get("/", (req, res) => {
  res.send("API is running 🚀")
})

// Error Handling Middleware
app.use(notFound)
app.use(errorHandler)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err))

// Server Start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`)
})
