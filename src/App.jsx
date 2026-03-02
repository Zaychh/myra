import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Heart from "./pages/Heart";

export default function App() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">

      {/* LOVE CANVAS ONLY ON LANDING */}
      {location.pathname === "/heart" && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 w-full h-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/heart" element={<Heart />} />
        </Routes>
      </div>

    </div>
  );
}