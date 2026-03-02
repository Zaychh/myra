import { gsap } from "gsap";

export function initLoveCanvas(canvas) {
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const state = {
    rotX: -0.3,
    rotY: 0,
    targetX: -0.3,
    targetY: 0
  };

  // ======================
  // AUTO ROTATION
  // ======================
  gsap.to(state, {
    targetY: Math.PI * 2,
    duration: 30,
    repeat: -1,
    ease: "none"
  });

  // ======================
  // DRAG CONTROL
  // ======================
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  const start = (x, y) => {
    dragging = true;
    lastX = x;
    lastY = y;
  };

  const move = (x, y) => {
    if (!dragging) return;
    state.targetY += (x - lastX) * 0.005;
    state.targetX += (y - lastY) * 0.005;
    lastX = x;
    lastY = y;
  };

  const end = () => (dragging = false);

  canvas.addEventListener("mousedown", e => start(e.clientX, e.clientY));
  canvas.addEventListener("mousemove", e => move(e.clientX, e.clientY));
  window.addEventListener("mouseup", end);

  canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];
    start(t.clientX, t.clientY);
  });
  canvas.addEventListener("touchmove", e => {
    const t = e.touches[0];
    move(t.clientX, t.clientY);
  });
  window.addEventListener("touchend", end);

  // ======================
  // SMOOTH INERTIA
  // ======================
  gsap.ticker.add(() => {
    state.rotX += (state.targetX - state.rotX) * 0.08;
    state.rotY += (state.targetY - state.rotY) * 0.08;
  });

  function rotate3D(x, y, z) {
    let dy = y * Math.cos(state.rotX) - z * Math.sin(state.rotX);
    let dz = y * Math.sin(state.rotX) + z * Math.cos(state.rotX);

    let dx = x * Math.cos(state.rotY) + dz * Math.sin(state.rotY);
    dz = -x * Math.sin(state.rotY) + dz * Math.cos(state.rotY);

    return { x: dx, y: dy, z: dz };
  }

  function project(x, y, z) {
    const scale = 700 / (700 + z);
    return {
      x: x * scale + canvas.width / 2,
      y: y * scale + canvas.height / 2,
      scale
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff6b81";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff6b81";
    ctx.font = "12px Arial";

    for (let t = 0; t < Math.PI * 2; t += 0.12) {
      // PURE HEART FORMULA (2D)
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      const x = hx * 16;
      const y = -hy * 16;
      const z = 0; // 🔑 THIS IS THE FIX

      const r = rotate3D(x, y, z);
      const p = project(r.x, r.y, r.z);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(p.scale, p.scale);
      ctx.fillText("I love you", -10, 0);
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  draw();

  return () => {
    window.removeEventListener("resize", resize);
  };
}