'use client';

import { useEffect, useRef } from 'react';

const SVG_PATH =
  'M1035.99 614.718C1018.6 632.486 1000.64 637.801 938.184 637.801C864.692 637.801 861.671 637.338 861.671 637.338H660.269C631.406 678.802 584.089 705.881 530.553 705.881C442.656 705.881 371.401 632.967 371.401 543.002C371.401 453.02 442.66 380.088 530.553 380.088C582.879 380.088 629.301 405.943 658.311 445.84H860.078C818.372 300.667 687.046 194.373 531.897 194.373C343.312 194.373 189.898 351.411 189.898 544.431C189.898 737.468 343.312 894.494 531.897 894.494C627.691 894.494 714.41 853.969 776.545 788.786C776.545 788.786 847.035 788.279 913.45 788.279C916.248 788.279 937.789 788.279 940.315 788.279C980.652 788.279 987.045 821.402 972.569 842.121C970.963 844.404 965.753 852.696 963.974 855.295C934.265 898.896 920.879 913.824 883.532 948.002C789.682 1033.8 665.941 1086 530.504 1086C237.97 1086 0 842.428 0 543.02C0 243.608 237.971 0 530.5 0C823.007 0 1061 243.608 1061 543.02C1061 566.939 1055.74 594.547 1035.99 614.718Z';

const DENSITY = 6;
const RETURN_SPEED = 0.045;
const FRICTION = 0.86;
const REPULSE_FORCE = 14;
const MOUSE_RADIUS = 150;

type Particle = {
  x: number;
  y: number;
  z: number;
  sphereX: number;
  sphereY: number;
  sphereZ: number;
  logoX: number;
  logoY: number;
  logoZ: number;
  originX: number;
  originY: number;
  originZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  hue: number;
  sat: number;
};

type ParticleLogoProps = {
  className?: string;
};

function shuffleIndexes(length: number) {
  const indexes = Array.from({ length }, (_, i) => i);
  let seed = 12345;

  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
}

export function ParticleLogo({ className }: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasContext = canvasElement.getContext('2d');
    if (!canvasContext) return;

    const canvas = canvasElement;
    const ctx = canvasContext;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let initialized = false;
    let sphereAngle = 0;
    let sphereT = 0;
    let sphereTarget = 0;
    let sphereVel = 0;

    const mouse = { x: -9999, y: -9999, radius: MOUSE_RADIUS };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const getCanvasSize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();

      return {
        w: Math.max(1, Math.floor(rect?.width || window.innerWidth || 800)),
        h: Math.max(1, Math.floor(rect?.height || window.innerHeight || 600)),
      };
    };

    const initParticles = () => {
      particles = [];

      const svgW = 1061;
      const svgH = 1086;
      const scale = Math.min((width * 0.55) / svgW, (height * 0.55) / svgH);
      const renderW = Math.max(Math.floor(svgW * scale), 2);
      const renderH = Math.max(Math.floor(svgH * scale), 2);

      const offscreen = document.createElement('canvas');
      offscreen.width = renderW;
      offscreen.height = renderH;

      const offscreenCtx = offscreen.getContext('2d');
      if (!offscreenCtx) return;

      offscreenCtx.scale(scale, scale);
      offscreenCtx.fillStyle = '#fff';
      offscreenCtx.fill(new Path2D(SVG_PATH));
      offscreenCtx.setTransform(1, 0, 0, 1, 0, 0);

      const imageData = offscreenCtx.getImageData(0, 0, renderW, renderH).data;
      const offsetX = (width - renderW) / 2;
      const offsetY = (height - renderH) / 2;
      const points: { x: number; y: number }[] = [];

      for (let y = 0; y < renderH; y += DENSITY) {
        for (let x = 0; x < renderW; x += DENSITY) {
          if (imageData[(y * renderW + x) * 4 + 3] > 128) {
            points.push({ x: x + offsetX, y: y + offsetY });
          }
        }
      }

      const count = points.length;
      if (!count) return;

      const cx = width / 2;
      const cy = height / 2;
      const sphereRadius = Math.min(width, height) * 0.2;
      const logoRadius = Math.max(renderW, renderH) * 0.55;
      const shuffledIndexes = shuffleIndexes(count);

      const spherePositions = Array.from({ length: count }, (_, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        return {
          x: sphereRadius * Math.sin(phi) * Math.cos(theta),
          y: sphereRadius * Math.sin(phi) * Math.sin(theta),
          z: sphereRadius * Math.cos(phi),
        };
      });

      for (let i = 0; i < count; i += 1) {
        const point = points[i];
        const spherePosition = spherePositions[shuffledIndexes[i]];
        const dx = (point.x - cx) / logoRadius;
        const dy = (point.y - cy) / logoRadius;
        const distanceSquared = dx * dx + dy * dy;
        const zNorm = distanceSquared < 1 ? Math.sqrt(1 - distanceSquared) : 0.05;
        const domeDepth = 180;
        const logoZ = zNorm * domeDepth - domeDepth * 0.3;

        particles.push({
          x: point.x,
          y: point.y,
          z: logoZ,
          sphereX: spherePosition.x,
          sphereY: spherePosition.y,
          sphereZ: spherePosition.z,
          logoX: point.x,
          logoY: point.y,
          logoZ,
          originX: point.x,
          originY: point.y,
          originZ: logoZ,
          vx: 0,
          vy: 0,
          vz: 0,
          size: 1.4 + Math.random() * 1.2,
          hue: 354 + Math.random() * 14,
          sat: 75 + Math.random() * 22,
        });
      }
    };

    const resize = () => {
      const size = getCanvasSize();
      width = size.w;
      height = size.h;
      canvas.width = width;
      canvas.height = height;

      if (width > 10 && height > 10) {
        initParticles();
        initialized = true;
      }
    };

    const animate = (now: number) => {
      animationFrame = requestAnimationFrame(animate);

      if (!initialized || !particles.length) {
        if (width > 10 && height > 10 && !initialized) resize();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      sphereVel += (sphereTarget - sphereT) * 0.004;
      sphereVel *= 0.92;
      sphereT += sphereVel;
      sphereT = Math.max(0, Math.min(1, sphereT));

      sphereAngle += 0.008 * sphereT;

      const t = sphereT;
      const sphereCosA = Math.cos(sphereAngle);
      const sphereSinA = Math.sin(sphereAngle);
      const sphereCosB = Math.cos(sphereAngle * 0.7);
      const sphereSinB = Math.sin(sphereAngle * 0.7);

      if (mouse.x > 0 && mouse.y > 0) {
        smoothMouse.x += (mouse.x / width - smoothMouse.x) * 0.05;
        smoothMouse.y += (mouse.y / height - smoothMouse.y) * 0.05;
      } else {
        const idleX = 0.5 + Math.sin(now * 0.00035) * 0.1;
        const idleY = 0.5 + Math.cos(now * 0.0005) * 0.08;
        smoothMouse.x += (idleX - smoothMouse.x) * 0.012;
        smoothMouse.y += (idleY - smoothMouse.y) * 0.012;
      }

      const tiltY = (smoothMouse.x - 0.5) * 0.65;
      const tiltX = (smoothMouse.y - 0.5) * -0.5;
      const cosTiltX = Math.cos(tiltX);
      const sinTiltX = Math.sin(tiltX);
      const cosTiltY = Math.cos(tiltY);
      const sinTiltY = Math.sin(tiltY);
      const cx = width / 2;
      const cy = height / 2;

      for (const particle of particles) {
        const sphereX = particle.sphereX * sphereCosA - particle.sphereZ * sphereSinA;
        const sphereZ = particle.sphereX * sphereSinA + particle.sphereZ * sphereCosA;
        const sphereY = particle.sphereY * sphereCosB - sphereZ * sphereSinB;
        const sphereZ2 = particle.sphereY * sphereSinB + sphereZ * sphereCosB;

        const logoX = particle.logoX - cx;
        const logoY = particle.logoY - cy;
        const logoZ = particle.logoZ;
        const logoX2 = logoX * cosTiltY + logoZ * sinTiltY;
        const logoZ2 = -logoX * sinTiltY + logoZ * cosTiltY;
        const logoY2 = logoY * cosTiltX - logoZ2 * sinTiltX;
        const logoZ3 = logoY * sinTiltX + logoZ2 * cosTiltX;

        particle.originX = (1 - t) * (cx + logoX2) + t * (cx + sphereX);
        particle.originY = (1 - t) * (cy + logoY2) + t * (cy + sphereY);
        particle.originZ = (1 - t) * logoZ3 + t * sphereZ2;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && t < 0.5) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * REPULSE_FORCE;
          particle.vy -= Math.sin(angle) * force * REPULSE_FORCE;
          particle.vz += force * 8;
        }

        particle.vx += (particle.originX - particle.x) * RETURN_SPEED;
        particle.vy += (particle.originY - particle.y) * RETURN_SPEED;
        particle.vz += (particle.originZ - particle.z) * RETURN_SPEED;
        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        particle.vz *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
      }

      particles.sort((a, b) => a.z - b.z);

      const perspective = 500;

      for (const particle of particles) {
        const scale3d = perspective / (perspective + particle.z);
        const x = cx + (particle.x - cx) * scale3d;
        const y = cy + (particle.y - cy) * scale3d;
        const drawSize = particle.size * scale3d;
        const depth = Math.max(0, Math.min(1, (particle.z + 300) / 600));
        const light = 16 + depth * 56;
        const alpha = 0.1 + depth * 0.88;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(drawSize, 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, ${particle.sat}%, ${light}%, ${alpha})`;
        ctx.fill();

        if (depth > 0.85) {
          ctx.beginPath();
          ctx.arc(
            x - drawSize * 0.3,
            y - drawSize * 0.3,
            drawSize * 0.3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 230, 230, ${(depth - 0.85) * 1.8})`;
          ctx.fill();
        }
      }

      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        gradient.addColorStop(0, 'rgba(255,50,50,0.08)');
        gradient.addColorStop(1, 'rgba(255,0,0,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const updateMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    const onMouseMove = (event: MouseEvent) => {
      updateMousePosition(event.clientX, event.clientY);
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onMouseDown = () => {
      sphereTarget = 1;
    };

    const onMouseUp = () => {
      sphereTarget = 0;
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateMousePosition(touch.clientX, touch.clientY);
      sphereTarget = 1;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateMousePosition(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      sphereTarget = 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', resize);

    resize();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
