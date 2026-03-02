import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Heart from "./pages/Heart";

export default function App() {
  return (
      <div className="w-screen h-screen bg-black overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/heart" element={<Heart />} />
        </Routes>
      </div>
  );
}