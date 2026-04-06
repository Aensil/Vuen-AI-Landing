import React, { useRef, useEffect, useCallback } from 'react';

interface OrbCanvasProps {
  className?: string;
  prefersReducedMotion?: boolean;
  paused?: boolean;
}

const OrbCanvas: React.FC<OrbCanvasProps> = ({
  className = '',
  prefersReducedMotion = false,
  paused = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rectCacheRef = useRef<DOMRect | null>(null);
  const isVisibleRef = useRef(true);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.34;
    const t = timeRef.current;
    const haloInnerRadius = baseRadius * 0.78;
    const haloOuterRadius = Math.min(Math.min(cx, cy) - 12, baseRadius * 1.34);

    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Background particles
    const particleSeed = 42;
    for (let i = 0; i < 30; i++) {
      const px = ((Math.sin(particleSeed * i * 0.73) + 1) / 2) * w;
      const py = ((Math.cos(particleSeed * i * 0.91) + 1) / 2) * h;
      const twinkle = Math.sin(t * 0.5 + i * 1.7) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(px, py, 0.8 + twinkle * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 200, ${0.1 + twinkle * 0.15})`;
      ctx.fill();
    }

    // Outer ambient halo — keep it circular so the glow belongs to the orb,
    // not to the square canvas buffer.
    const glowBreath = Math.sin(t * 0.5) * 0.04 + 0.04;
    const outerGlow = ctx.createRadialGradient(cx, cy, haloInnerRadius, cx, cy, haloOuterRadius);
    outerGlow.addColorStop(0, 'rgba(0, 229, 200, 0)');
    outerGlow.addColorStop(0.45, 'rgba(0, 229, 200, 0)');
    outerGlow.addColorStop(0.7, `rgba(0, 229, 200, ${0.08 + glowBreath * 0.45})`);
    outerGlow.addColorStop(0.88, `rgba(124, 92, 250, ${0.05 + glowBreath * 0.28})`);
    outerGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, haloOuterRadius, 0, Math.PI * 2);
    ctx.fill();

    // Breathing: visible 8% scale oscillation so it looks alive
    const breathe = Math.sin(t * 0.6) * 0.08 + 1;
    const coreRadius = baseRadius * breathe;

    // Draw multiple ring layers for the organic orb effect
    // Reduce ring count on smaller canvases (mobile) for performance
    const ringCount = w < 280 ? 30 : 50;
    const segmentCount = w < 280 ? 120 : 180;
    const mouseInfluence = prefersReducedMotion ? 0 : 0.15;

    for (let ring = 0; ring < ringCount; ring++) {
      const ringProgress = ring / ringCount;
      const alpha = 0.03 + Math.sin(ringProgress * Math.PI) * 0.08;
      const radiusOffset = (ringProgress - 0.5) * baseRadius * 0.1;
      const phaseOffset = ring * 0.13;
      const distortStrength = 4 + Math.sin(ringProgress * Math.PI * 2) * 6;

      ctx.beginPath();

      for (let i = 0; i <= segmentCount; i++) {
        const angle = (i / segmentCount) * Math.PI * 2;

        // Organic noise-like distortion from multiple sine waves
        const noise =
          Math.sin(angle * 3 + t * 0.7 + phaseOffset) * distortStrength +
          Math.sin(angle * 5 - t * 0.5 + phaseOffset * 2) * (distortStrength * 0.5) +
          Math.sin(angle * 7 + t * 0.3 + phaseOffset * 0.5) * (distortStrength * 0.3) +
          Math.sin(angle * 2 - t * 0.9 + ring * 0.05) * (distortStrength * 0.4);

        // Mouse influence
        const mx = mouseRef.current.x * mouseInfluence * Math.cos(angle) * 15;
        const my = mouseRef.current.y * mouseInfluence * Math.sin(angle) * 15;

        const r = coreRadius + radiusOffset + noise + mx + my;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();

      // Color shifts across rings: teal core → violet edges (wider range)
      const hue = 170 + ringProgress * 50;
      const sat = 80 + ringProgress * 15;
      const light = 50 + Math.sin(ringProgress * Math.PI) * 15;

      ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
      ctx.lineWidth = 0.6 + Math.sin(ringProgress * Math.PI) * 0.4;
      ctx.stroke();
    }

    // Inner bright ring (the most visible one)
    const innerSegments = w < 280 ? 140 : 200;
    for (let pass = 0; pass < 3; pass++) {
      ctx.beginPath();
      const passAlpha = [0.25, 0.15, 0.08][pass];
      const passWidth = [1.2, 2.0, 3.5][pass];
      const passRadius = coreRadius + pass * 0.5;

      for (let i = 0; i <= innerSegments; i++) {
        const angle = (i / innerSegments) * Math.PI * 2;
        const noise =
          Math.sin(angle * 3 + t * 0.7) * 5 +
          Math.sin(angle * 5 - t * 0.5) * 3 +
          Math.sin(angle * 7 + t * 0.3) * 2;

        const mx = mouseRef.current.x * mouseInfluence * Math.cos(angle) * 15;
        const my = mouseRef.current.y * mouseInfluence * Math.sin(angle) * 15;

        const r = passRadius + noise + mx + my;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 229, 200, ${passAlpha})`;
      ctx.lineWidth = passWidth;
      ctx.shadowColor = 'rgba(0, 229, 200, 0.4)';
      ctx.shadowBlur = pass === 2 ? 20 : 0;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Carve the center back out so the orb reads as a true hollow ring.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, coreRadius * 0.72, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [prefersReducedMotion]);

  // Size the canvas buffer to match actual rendered size.
  // Uses offsetWidth/offsetHeight which return layout dimensions unaffected
  // by ancestor CSS transforms (unlike getBoundingClientRect).
  const sizeCanvas = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    rectCacheRef.current = canvas.getBoundingClientRect();
    return { w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = sizeCanvas(canvas, ctx);

    // Static frame for reduced motion
    if (prefersReducedMotion) {
      timeRef.current = 0;
      draw(ctx, w, h);
      return;
    }

    // IntersectionObserver: pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // ResizeObserver: re-size canvas buffer on layout changes
    const resizeObserver = new ResizeObserver(() => {
      sizeCanvas(canvas, ctx);
    });
    resizeObserver.observe(canvas);

    // Animation loop with delta timing
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;

      if (isVisibleRef.current && !pausedRef.current) {
        // Delta time in seconds, capped at 50ms to avoid jumps after tab switch
        const delta = Math.min((timestamp - (startTimeRef.current + timeRef.current * 1000)) / 1000, 0.05);
        timeRef.current += delta;
        startTimeRef.current = timestamp - timeRef.current * 1000;

        const { w: cw, h: ch } = sizeCanvas(canvas, ctx);
        draw(ctx, cw, ch);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Mouse handler — uses cached rect
    const handlePointer = (clientX: number, clientY: number) => {
      const rect = rectCacheRef.current;
      if (!rect) return;
      mouseRef.current = {
        x: ((clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const handleMouse = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('touchmove', handleTouch);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [draw, sizeCanvas, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    >
      Animated orb visualization
    </canvas>
  );
};

export default OrbCanvas;
