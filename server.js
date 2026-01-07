import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import companyRoutes from "./routes/Company.routes.js"
import userRoutes from "./routes/User.routes.js"
import mailRoutes from "./routes/Mail.route.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js"
import connectDB from "./utils/db.js"

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
app.use("/api/companies", companyRoutes)
app.use("/api/users", userRoutes)
app.use("/api/mails", mailRoutes)

// Test Route
app.get("/", (req, res) => {
  res.send("API is running 🚀")
})

// Error Handling Middleware
app.use(notFound)
app.use(errorHandler)

// MongoDB Connection
connectDB()

// Server Start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`)
})
