import { useState, useEffect } from "react"
import { verifyOtp } from "../api"
import { useLocation, useNavigate } from "react-router-dom"

export default function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state?.mobile) {
      navigate("/")
    }
  }, [state, navigate])

  const submit = async (e) => {
    e.preventDefault()
    if (!otp) return

    try {
      setLoading(true)

      await verifyOtp(state.mobile, otp)

      navigate("/register", {
        state: {
          mobile: state.mobile.startsWith("+")
            ? state.mobile
            : `+91${state.mobile}`,
        },
      })
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          Enter the 6-digit code sent to your mobile
        </p>

        {/* Mobile preview */}
        <div className="text-sm text-gray-300 text-center mb-6">
          Sent to
          <span className="block font-semibold text-white mt-1">
            {state?.mobile}
          </span>
        </div>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full text-center tracking-widest text-lg p-3 rounded-lg bg-black/40 border border-white/20 mb-6 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Optional helper */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Didn’t receive the OTP? Please wait a moment or request again.
        </p>
      </form>
    </div>
  )
}
