import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition"
          >
            Logout
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "My Profile",
              desc: "View and update your personal information",
            },
            {
              title: "My Services",
              desc: "Explore consulting services available to you",
            },
            {
              title: "Support",
              desc: "Get help or contact our support team",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:bg-white/20 transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-20 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ABC Consulting
        </footer>
      </div>
    </div>
  )
}
