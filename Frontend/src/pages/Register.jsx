import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { registerUser } from "../api"

export default function Register() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!state?.mobile) {
      navigate("/")
    }
  }, [state, navigate])

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
      navigate("/complete-profile")
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
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
        <h2 className="text-3xl font-bold text-center mb-1">
          Complete Registration
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          You’re almost there
        </p>

        <div className="text-sm text-gray-300 mb-5 text-center">
          Registering with
          <span className="block font-semibold text-white mt-1">
            {state?.mobile}
          </span>
        </div>

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
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>
      </form>
    </div>
  )
}
