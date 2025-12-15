const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
    },
    name: String,
    email: {
      type: String,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
