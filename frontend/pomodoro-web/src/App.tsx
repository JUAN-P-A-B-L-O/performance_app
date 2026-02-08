import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { GymRoutes } from "./modules/gym";
import { HomePage } from "./pages/home/HomePage";
import { LandingPage } from "./pages/landing/LandingPage";
import { LoginPage } from "./pages/login/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pomodoro" element={<HomePage />} />
        <Route
          path="/gym"
          element={
            <ProtectedRoute>
              <GymRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gym/*"
          element={
            <ProtectedRoute>
              <GymRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
