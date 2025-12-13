const moment = require("moment")
const User = require("../models/User")
const Otp = require("../models/Otp")
const generateOtp = require("../utils/generateOtp")
const { generateToken } = require("../utils/jwt")


exports.sendOtp = async (req, res) => {
  const { mobile } = req.body
  const otp = generateOtp()
  const expiresAt = moment().add(5, "minutes").toDate()
  await Otp.create({
    mobile,
    otp,
    expiresAt,
  })
  // console.log("OTP sent:", otp)
  res.json({ message: "OTP sent successfully" })
}


exports.login = async (req, res) => {
  const { mobile, otp } = req.body
  const otpRecord = await Otp.findOne({
    mobile,
    otp,
    verified: false,
  })
  if (!otpRecord) {
    return res.status(400).json({ message: "Invalid OTP" })
  }
  if (moment().isAfter(otpRecord.expiresAt)) {
    return res.status(400).json({ message: "OTP expired" })
  }
  otpRecord.verified = true
  await otpRecord.save()
  let user = await User.findOne({ mobile })
  if (!user) {
    return res.json({
      message: "OTP verified, registration required",
      needsRegistration: true,
    })
  }
  user.isMobileVerified = true
  await user.save()
  const token = generateToken(user)
  res.json({
    message: "Login successful",
    token,
    user,
  })
}



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
