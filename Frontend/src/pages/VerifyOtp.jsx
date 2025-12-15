import { useState } from "react"
import { verifyOtp } from "../api"
import { useLocation, useNavigate } from "react-router-dom"

export default function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const { state } = useLocation()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const res = await verifyOtp(state.mobile, otp)

    if (res.data.needsRegistration) {
      navigate("/register", { state })
    } else {
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    }
  }

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border w-full p-2 mb-4"
      />
      <button className="bg-black text-white w-full p-2">
        Verify OTP
      </button>
    </form>
  )
}
