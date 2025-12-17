  const moment = require("moment")
  const User = require("../models/User")
  const Otp = require("../models/Otp")
  const generateOtp = require("../utils/generateOtp")
  const { generateToken } = require("../utils/jwt")
  const twilioClient = require("../config/twilio")

  exports.sendOtp = async (req, res) => {
    try {
      const { mobile } = req.body
      
      const formattedMobile = mobile.startsWith("+")
        ? mobile
        : `+91${mobile}`

      const otp = generateOtp()
      const expiresAt = moment().add(5, "minutes").toDate()

      await Otp.create({
        mobile: formattedMobile,
        otp,
        expiresAt,
        verified: false,
      })
      await twilioClient.messages.create({
        body: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        from: process.env.TWILIO_PHONE,
        to: formattedMobile,
      })
      res.json({ message: "OTP sent successfully" })
    } catch (error) {
      console.error("OTP error:", error) 
      res.status(500).json({
        message: "Failed to send OTP",
      })
    }
  }


  exports.verifyOtp = async (req, res) => {
    try {
      let { mobile, otp } = req.body
      const formattedMobile = mobile.startsWith("+")
        ? mobile
        : `+91${mobile}`
      const otpRecord = await Otp.findOne({
        mobile: formattedMobile,
        otp,
        verified: false,
      })
      if (!otpRecord) {
        return res.status(400).json({
          message: "OTP is incorrect",
        })
      }
      if (moment().isAfter(otpRecord.expiresAt)) {
        return res.status(400).json({
          message: "OTP expired",
        })
      }
      otpRecord.verified = true
      await otpRecord.save()
        let user = await User.findOne({ mobile: formattedMobile })
        if (!user) {
        await User.create({
          mobile: formattedMobile,
          isMobileVerified: true,
        })
        return res.json({
          message: "Welcome to Zomato, please provide your name and email",
          isNewUser: true,
        })
      }
        return res.json({
        message: "Welcome back to Zomato",
        isNewUser: false,
      })
    } catch (error) {
      console.error("Verify OTP error:", error)
      res.status(500).json({ message: "Something went wrong" })
    }
  }
  


  exports.completeProfile = async (req, res) => {
    try {
      let { mobile, name, email } = req.body
      const formattedMobile = mobile.startsWith("+")
        ? mobile
        : `+91${mobile}`
      const otpRecord = await Otp.findOne({
        mobile: formattedMobile,
        verified: true,
      })
      if (!otpRecord) {
        return res.status(400).json({
          message: "OTP verification required",
        })
      }
        let user = await User.findOne({ mobile: formattedMobile })
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        })
      }
      user = await User.create({
        mobile: formattedMobile,
        name,
        email,
        isMobileVerified: true,
      })
      const token = generateToken(user)
      res.status(201).json({
        message: "Registration completed",
        token,
        user,
      })
    } catch (error) {
      console.error("Complete profile error:", error)
      res.status(500).json({ message: "Something went wrong" })
    }
  }
  

