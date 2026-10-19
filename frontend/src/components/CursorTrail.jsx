import { useEffect, useRef, useState } from "react";

const colors = ["255, 132, 193", "185, 155, 255", "116, 225, 235", "255, 218, 143"];
const maxParticles = 80;

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(0);
  const lastPointsRef = useRef(new Map());
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event) => setReducedMotion(event.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || reducedMotion) return undefined;

    const particles = particlesRef.current;
    const lastPoints = lastPointsRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let previousFrameTime = 0;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const sprites = new Map();
    colors.forEach((color) => {
      const sprite = document.createElement("canvas");
      sprite.width = 128;
      sprite.height = 128;
      const spriteContext = sprite.getContext("2d");
      if (!spriteContext) return;

      const gradient = spriteContext.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, `rgba(${color}, 0.34)`);
      gradient.addColorStop(0.32, `rgba(${color}, 0.22)`);
      gradient.addColorStop(0.7, `rgba(${color}, 0.07)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      spriteContext.fillStyle = gradient;
      spriteContext.fillRect(0, 0, 128, 128);
      sprites.set(color, sprite);
    });

    const draw = (timestamp) => {
      const elapsed = previousFrameTime
        ? Math.min((timestamp - previousFrameTime) / 1000, 0.05)
        : 0;
      previousFrameTime = timestamp;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      let livingParticleCount = 0;
      particles.forEach((particle) => {
        particle.age += elapsed;
        if (particle.age >= particle.lifetime) return;

        particle.x += particle.velocityX * elapsed;
        particle.y += particle.velocityY * elapsed;
        const progress = particle.age / particle.lifetime;
        const radius = particle.radius * (0.55 + progress * 0.85);
        const alpha = Math.sin(Math.PI * progress) * particle.opacity;
        context.globalAlpha = alpha;
        context.drawImage(
          sprites.get(particle.color),
          particle.x - radius,
          particle.y - radius,
          radius * 2,
          radius * 2,
        );
        particles[livingParticleCount] = particle;
        livingParticleCount += 1;
      });

      particles.length = livingParticleCount;
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      if (particles.length) {
        animationFrameRef.current = window.requestAnimationFrame(draw);
      } else {
        animationFrameRef.current = 0;
        previousFrameTime = 0;
      }
    };

    const scheduleDraw = () => {
      if (!animationFrameRef.current && !document.hidden) {
        animationFrameRef.current = window.requestAnimationFrame(draw);
      }
    };

    const addParticle = (x, y) => {
      if (particles.length >= maxParticles) particles.shift();
      particles.push({
        x,
        y,
        velocityX: (Math.random() - 0.5) * 24,
        velocityY: (Math.random() - 0.5) * 24,
        radius: 24 + Math.random() * 22,
        opacity: 0.42 + Math.random() * 0.2,
        age: 0,
        lifetime: 0.95 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      scheduleDraw();
    };

    const handlePointerMove = (event) => {
      const previous = lastPoints.get(event.pointerId);
      if (!previous) {
        lastPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
        addParticle(event.clientX, event.clientY);
        return;
      }

      const distance = Math.hypot(event.clientX - previous.x, event.clientY - previous.y);
      const steps = Math.max(1, Math.min(6, Math.floor(distance / 28)));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        addParticle(
          previous.x + (event.clientX - previous.x) * progress,
          previous.y + (event.clientY - previous.y) * progress,
        );
      }
      lastPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
    };

    const handlePointerDown = (event) => {
      lastPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
      addParticle(event.clientX, event.clientY);
    };

    const handlePointerEnd = (event) => {
      lastPoints.delete(event.pointerId);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = 0;
      } else {
        scheduleDraw();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerEnd, { passive: true });
    window.addEventListener("pointercancel", handlePointerEnd, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      particles.length = 0;
      lastPoints.clear();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true" />;
};

export default CursorTrail;
