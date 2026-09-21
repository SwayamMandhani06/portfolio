import React, { useEffect, useRef } from 'react';

interface Point {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  life: number;
}

export const InteractiveDotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const points: Point[] = [];
    const shockwaves: Shockwave[] = [];
    const spacing = 36; // Spacing between dots in the grid
    const repelRadius = 130;
    const maxRepelDistance = 42;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovering: false,
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Rebuild points grid
      points.length = 0;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * spacing;
          const originY = offsetY + r * spacing;
          points.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleShockwave = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const rect = canvas.getBoundingClientRect();
      const x = customEvent.detail?.x !== undefined ? customEvent.detail.x - rect.left : width * 0.75;
      const y = customEvent.detail?.y !== undefined ? customEvent.detail.y - rect.top : height * 0.4;
      shockwaves.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.95,
        strength: 2.0,
        life: 1,
      });
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('hero-shockwave', handleShockwave);
    document.addEventListener('mouseleave', handleMouseLeave);
    resize();

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const isTouch = window.matchMedia('(pointer: coarse)').matches;

      // Check current theme for dot color
      const isCream = document.documentElement.classList.contains('cream');
      const baseDotColor = isCream ? 'rgba(20, 20, 22, 0.16)' : 'rgba(255, 255, 255, 0.14)';

      // Update active shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 12;
        sw.life = 1 - sw.radius / sw.maxRadius;
        if (sw.life <= 0) {
          shockwaves.splice(s, 1);
        }
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        if (!isTouch && mouse.isHovering) {
          // Physics repel from mouse
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * maxRepelDistance;
            const angle = Math.atan2(dy, dx);
            const targetX = p.originX - Math.cos(angle) * force;
            const targetY = p.originY - Math.sin(angle) * force;

            p.vx += (targetX - p.x) * 0.12;
            p.vy += (targetY - p.y) * 0.12;
          }
        } else if (isTouch) {
          // Subtle ambient wave on mobile
          const wave = Math.sin(time + p.originX * 0.015 + p.originY * 0.015) * 3;
          p.x = p.originX;
          p.y = p.originY + wave;
        }

        // Apply shockwave impulses
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.hypot(dx, dy);
          const waveDiff = Math.abs(dist - sw.radius);
          if (waveDiff < 50 && dist > 0) {
            const impulse = (1 - waveDiff / 50) * sw.strength * sw.life;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * impulse * 3.5;
            p.vy += Math.sin(angle) * impulse * 3.5;
          }
        }

        // Spring back to origin
        const homeForceX = (p.originX - p.x) * 0.08;
        const homeForceY = (p.originY - p.y) * 0.08;
        p.vx = (p.vx + homeForceX) * 0.82;
        p.vy = (p.vy + homeForceY) * 0.82;
        p.x += p.vx;
        p.y += p.vy;

        // Spotlight brightness calculation
        const distToMouse = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        let dotRadius = 1.3;
        let fillStyle = baseDotColor;

        if (distToMouse < repelRadius * 1.5) {
          const proximity = 1 - distToMouse / (repelRadius * 1.5);
          dotRadius = 1.3 + proximity * 1.4;
          if (proximity > 0.4) {
            fillStyle = isCream
              ? `rgba(255, 107, 53, ${0.4 + proximity * 0.5})`
              : `rgba(255, 107, 53, ${0.3 + proximity * 0.6})`;
          } else {
            fillStyle = isCream
              ? `rgba(20, 20, 22, ${0.18 + proximity * 0.4})`
              : `rgba(255, 255, 255, ${0.16 + proximity * 0.45})`;
          }
        }

        // Shockwave glowing highlights
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const dist = Math.hypot(p.x - sw.x, p.y - sw.y);
          if (Math.abs(dist - sw.radius) < 35) {
            dotRadius = Math.max(dotRadius, 2.2);
            fillStyle = '#FF6B35';
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('hero-shockwave', handleShockwave);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
