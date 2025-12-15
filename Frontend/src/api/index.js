import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export const sendOtp = (mobile) => {
  return API.post("/auth/send-otp", { mobile })
}


export const verifyOtp = (mobile, otp) => {
  return API.post("/auth/verify-otp", { mobile, otp })
}

export const registerUser = (data) => {
  return API.post("/auth/complete-profile", data)
}
