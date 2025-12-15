import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../api/index"

export default function EnterMobile() {
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (mobile.length < 10) return

    try {
      setLoading(true)
      await sendOtp(mobile)
      navigate("/verify", { state: { mobile } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">
          Login / Register
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Enter your mobile number to receive an OTP
        </p>

        <input
          type="tel"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white mb-4"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-60"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  )
}
