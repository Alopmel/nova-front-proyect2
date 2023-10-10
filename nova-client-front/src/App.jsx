import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Context/AuthContext"

import LoginPage from "./Pages/LoginPage.jsx"
import RegisterPage from "./Pages/RegisterPage.jsx"
import HomePage from "./Pages/HomePage"
import UserProfile from "./Pages/UserProfile"
import AdminProfile from "./Pages/AdminProfile"
import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
    <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              {/* <Route element={<ProtectedRoute />}> */}
                <Route path="/perfil" element={<UserProfile />} />
                <Route path="/administrador" element={<AdminProfile />} />
              {/* </Route>              */}
            </Routes>
          </BrowserRouter>
    </AuthProvider>
  )
}

export default App