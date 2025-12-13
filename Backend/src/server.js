require("dotenv").config()
const express = require("express")
const authRoutes = require("./routes/auth.routes")

const app = express()

app.use(express.json())
app.use("/auth", authRoutes)

const app = require("./app")
const connectDB = require("./config/db")

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
