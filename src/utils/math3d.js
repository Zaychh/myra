export function rotateX(p, a) {
  return {
    x: p.x,
    y: p.y * Math.cos(a) - p.z * Math.sin(a),
    z: p.y * Math.sin(a) + p.z * Math.cos(a)
  };
}

export function rotateY(p, a) {
  return {
    x: p.x * Math.cos(a) + p.z * Math.sin(a),
    y: p.y,
    z: -p.x * Math.sin(a) + p.z * Math.cos(a)
  };
}

export function project(p, canvas) {
  const depth = 800;
  const scale = depth / (depth - p.z);
  return {
    x: p.x * scale + canvas.width / 2,
    y: p.y * scale + canvas.height / 2
  };
}