// src/hooks/useBackgroundMusic.js
import { useEffect, useRef } from "react"

export default function useBackgroundMusic(src) {
  const audioRef = useRef(null)
  const unlockedRef = useRef(false)

  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return

      const audio = new Audio(src)
      audio.loop = true
      audio.volume = 1 // max allowed by browser
      audio.play().catch(() => {})

      audioRef.current = audio
      unlockedRef.current = true

      window.removeEventListener("pointerdown", unlock)
      window.removeEventListener("touchstart", unlock)
    }

    // MOBILE + DESKTOP SAFE
    window.addEventListener("pointerdown", unlock)
    window.addEventListener("touchstart", unlock)

    return () => {
      window.removeEventListener("pointerdown", unlock)
      window.removeEventListener("touchstart", unlock)

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
    }
  }, [src])
}