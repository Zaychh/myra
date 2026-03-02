import { useEffect, useRef } from "react";
import { initLoveCanvas } from "../canvas/love";

export default function Heart() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const unlockedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;

    if (!canvas || !audio) return;

    const destroy = initLoveCanvas(canvas);

    const unlockAudio = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;

      audio.volume = 0.8;
      audio.loop = true;
      audio.play().catch(() => {});

      // once only
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    // DESKTOP
    window.addEventListener("pointerdown", unlockAudio, { once: true });

    // MOBILE FALLBACK (Safari kadang bandel)
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      destroy && destroy();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
      />

      <audio
        ref={audioRef}
        src="/music/if_i_had_a_gun.mp3"
        preload="auto"
      />
    </>
  );
}