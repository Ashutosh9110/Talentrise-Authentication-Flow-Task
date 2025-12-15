require("dotenv").config()
const express = require("express")
const authRoutes = require("./src/routes/authRoutes")
const cors = require("cors")
const PORT = process.env.PORT || 5000;


const app = express()


const corsOptions = {
    origin: [
      "http://localhost:5173" ],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(express.json())
app.use("/api/auth", authRoutes)

// const app = require("./app")
const connectDB = require("./src/config/db")

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
