import { useEffect, useRef } from "react"
import { Routes, Route } from "react-router-dom"
import { gsap } from "gsap"
import { initLoveCanvas } from "./canvas/love"
import Landing from "./pages/Landing"
import Heart from "./pages/Heart"

export default function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const destroy = initLoveCanvas(canvasRef.current)

    gsap.to(window, {
      duration: 80,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        window.__LOVE_ROT_Y += 0.002
      }
    })

    return () => destroy && destroy()
  }, [])

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      <div className="relative z-10 w-full h-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/heart" element={<Heart />} />
        </Routes>
      </div>
    </div>
  )
}