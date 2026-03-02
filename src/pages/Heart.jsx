import { useEffect } from "react"
import useBackgroundMusic from "../hooks/useBackgroundMusic"

export default function Heart() {
  useBackgroundMusic("/music/reff-love-song.mp3")

  useEffect(() => {
    let dragging = false
    let lx = 0
    let ly = 0

    const down = e => {
      dragging = true
      lx = e.clientX || e.touches?.[0].clientX
      ly = e.clientY || e.touches?.[0].clientY
    }

    const move = e => {
      if (!dragging) return
      const x = e.clientX || e.touches?.[0].clientX
      const y = e.clientY || e.touches?.[0].clientY

      window.__LOVE_ROT_Y += (x - lx) * 0.005
      window.__LOVE_ROT_X += (y - ly) * 0.005

      lx = x
      ly = y
    }

    const up = () => dragging = false

    window.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)

    return () => {
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
  }, [])

  return null
}