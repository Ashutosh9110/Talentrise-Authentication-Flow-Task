import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { registerUser } from "../api"

export default function Register() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email) return

    try {
      setLoading(true)

      const res = await registerUser({
        mobile: state.mobile,
        name,
        email,
      })

      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
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
          Complete Registration
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Just one more step to get started
        </p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/40 border border-white/20 mb-6 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>
      </form>
    </div>
  )
}
