require("dotenv").config()
const express = require("express")
const userRoutes = require("./src/routes/authRoutes")
const { default: mongoose } = require("mongoose")
const { CallPage } = require("twilio/lib/rest/api/v2010/account/call")
const PORT = 5000


const app = express()

app.use(express.json)
app.use("/users", userRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/dummy")
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => "Server running at PORT: 5000")
  })
  .catch((err) => console.log("Unable to connect. Reason: ", err))
