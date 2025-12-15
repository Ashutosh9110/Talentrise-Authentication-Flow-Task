import { BrowserRouter, Routes, Route } from "react-router-dom"
import EnterMobile from "./pages/EnterMobile"
import VerifyOtp from "./pages/VerifyOtp"
import ThankYou from "./pages/ThankYou"
import Register from "./pages/Register"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterMobile />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<ThankYou />} />
      </Routes> 
    </BrowserRouter>
  )
}
