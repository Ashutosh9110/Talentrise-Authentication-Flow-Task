import { BrowserRouter, Routes, Route } from "react-router-dom"
import EnterMobile from "./pages/EnterMobile"
import VerifyOtp from "./pages/VerifyOtp"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterMobile />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes> 
    </BrowserRouter>
  )
}
