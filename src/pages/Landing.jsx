import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Particles from "../effects/Particles";

export default function Landing() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const text = "Hey...How’s life going, asa?";
    titleRef.current.textContent = "";

    const tl = gsap.timeline();

    tl.to({}, {
      duration: text.length * 0.2,
      onUpdate() {
        const progress = Math.floor(this.progress() * text.length);
        titleRef.current.textContent = text.slice(0, progress);
      }
    })

    .to(subRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })

    .to({}, {
      duration: 2,
      onComplete: () => navigate("/heart")
    });

  }, [navigate]);

  return (
    <div className="relative h-screen w-screen bg-black glossy-bg overflow-hidden">

      {/* PARTICLES */}
      <Particles />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <h1
            ref={titleRef}
            className="text-white font-semibold text-[32px] md:text-[64px] leading-tight"
          />
          <p
            ref={subRef}
            className="mt-6 text-white/50 italic opacity-0 text-sm md:text-base"
          >
            – I have something for you, I hope you like it. –
          </p>
        </div>
      </div>

    </div>
  );
}