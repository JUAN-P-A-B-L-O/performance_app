import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GymPage } from "./pages/gym/GymPage";
import { HomePage } from "./pages/home/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pomodoro" element={<HomePage />} />
        <Route path="/gym" element={<GymPage />} />
      </Routes>
    </BrowserRouter>
  );
}
