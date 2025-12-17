  const mongoose = require("mongoose")


  const userSchema = new mongoose.Schema(
    {
      mobile: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      name: String,
      email: String,
      isMobileVerified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )

  module.exports = mongoose.model("User", userSchema)
