import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GymRoutes } from "./modules/gym";
import { HomePage } from "./pages/home/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pomodoro" element={<HomePage />} />
        <Route path="/gym/*" element={<GymRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
