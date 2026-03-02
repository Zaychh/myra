import { useEffect, useRef } from "react";
import { initLoveCanvas } from "../canvas/love";

export default function Heart() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;

    if (!canvas) return;

    const destroy = initLoveCanvas(canvas);

    const startAudio = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      audio.volume = 0.8;
      audio.loop = true;
      audio.play().catch(() => {});

      window.removeEventListener("pointerdown", startAudio);
    };

    // USER GESTURE LISTENER
    window.addEventListener("pointerdown", startAudio);

    return () => {
      destroy && destroy();
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener("pointerdown", startAudio);
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