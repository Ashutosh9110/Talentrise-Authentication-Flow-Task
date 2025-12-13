import { useState } from "react"
import { sendOtp } from "../api"
import { useNavigate } from "react-router-dom"

export default function EnterMobile() {
  const [mobile, setMobile] = useState("")
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await sendOtp(mobile)
    navigate("/verify", { state: { mobile } })
  }

  return (
    <form onSubmit={submit} className="p-6 max-w-sm mx-auto">
      <input
        placeholder="Mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="border w-full p-2 mb-4"
      />
      <button className="bg-black text-white w-full p-2">
        Send OTP
      </button>
    </form>
  )
}
