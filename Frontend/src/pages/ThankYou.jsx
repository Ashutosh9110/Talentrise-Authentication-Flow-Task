import { useNavigate } from "react-router-dom"

export default function ThankYou() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center shadow-2xl max-w-md w-full text-white">
        

        <h1 className="text-3xl font-bold mb-3">
          Registration Successful
        </h1>

        <p className="text-gray-300 mb-8">
          Thank you for registering with us.  
          Your account has been created successfully.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition cursor-pointer"
        >
          Want to register another user
        </button>
      </div>
    </div>
  )
}
