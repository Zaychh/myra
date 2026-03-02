import { useEffect, useRef } from "react";
import { initLoveCanvas } from "../canvas/love";

export default function Heart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const destroy = initLoveCanvas(canvasRef.current);
    return () => destroy && destroy();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black glossy-bg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
      />
    </div>
  );
}