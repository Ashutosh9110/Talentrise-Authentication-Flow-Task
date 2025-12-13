const User = require("../models/User")
const { generateToken } = require("../utils/jwt")



exports.register = async (req, res) => {
  const { mobile, name, email } = req.body

  const user = await User.create({
    mobile,
    name,
    email,
    isMobileVerified: true,
  })
  const token = generateToken(user)
  res.status(201).json({
    message: "Registration successful",
    token,
    user,
  })
}
