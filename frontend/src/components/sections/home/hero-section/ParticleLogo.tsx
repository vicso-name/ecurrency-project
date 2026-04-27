"use client";

import { useEffect, useRef } from "react";

const SVG_PATH =
  "M1035.99 614.718C1018.6 632.486 1000.64 637.801 938.184 637.801C864.692 637.801 861.671 637.338 861.671 637.338H660.269C631.406 678.802 584.089 705.881 530.553 705.881C442.656 705.881 371.401 632.967 371.401 543.002C371.401 453.02 442.66 380.088 530.553 380.088C582.879 380.088 629.301 405.943 658.311 445.84H860.078C818.372 300.667 687.046 194.373 531.897 194.373C343.312 194.373 189.898 351.411 189.898 544.431C189.898 737.468 343.312 894.494 531.897 894.494C627.691 894.494 714.41 853.969 776.545 788.786C776.545 788.786 847.035 788.279 913.45 788.279C916.248 788.279 937.789 788.279 940.315 788.279C980.652 788.279 987.045 821.402 972.569 842.121C970.963 844.404 965.753 852.696 963.974 855.295C934.265 898.896 920.879 913.824 883.532 948.002C789.682 1033.8 665.941 1086 530.504 1086C237.97 1086 0 842.428 0 543.02C0 243.608 237.971 0 530.5 0C823.007 0 1061 243.608 1061 543.02C1061 566.939 1055.74 594.547 1035.99 614.718Z";

const DENSITY = 6;
const RETURN_SPEED = 0.045;
const FRICTION = 0.86;
const REPULSE_FORCE = 14;
const SPHERE_ACCEL = 0.004;
const SPHERE_FRICTION = 0.92;

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
  const indexes = Array.from({ length }, (_, index) => index);
  let seed = 12345;

  function random() {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  }

  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
}

export function ParticleLogo({ className }: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let initialized = false;

    const mouse = { x: -9999, y: -9999, radius: 150 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    let sphereT = 0;
    let sphereTarget = 0;
    let sphereVel = 0;
    let sphereAngle = 0;

    function getCanvasSize() {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();

      return {
        w: Math.max(1, Math.floor(rect?.width || window.innerWidth || 800)),
        h: Math.max(1, Math.floor(rect?.height || window.innerHeight || 600)),
      };
    }

    function initParticles() {
      particles = [];

      const svgW = 1061;
      const svgH = 1086;
      const isMobile = width < 768;
      const scaleFactor = isMobile ? 0.62 : 0.55;
      const scale = Math.min(
        (width * scaleFactor) / svgW,
        (height * scaleFactor) / svgH,
      );
      const renderW = Math.max(Math.floor(svgW * scale), 2);
      const renderH = Math.max(Math.floor(svgH * scale), 2);

      const offscreen = document.createElement("canvas");
      offscreen.width = renderW;
      offscreen.height = renderH;

      const offscreenCtx = offscreen.getContext("2d");
      if (!offscreenCtx) return;

      offscreenCtx.scale(scale, scale);
      offscreenCtx.fillStyle = "#fff";
      offscreenCtx.fill(new Path2D(SVG_PATH));
      offscreenCtx.setTransform(1, 0, 0, 1, 0, 0);

      const data = offscreenCtx.getImageData(0, 0, renderW, renderH).data;
      const offsetX = (width - renderW) / 2;
      const offsetY = (height - renderH) / 2;
      const points: { x: number; y: number }[] = [];

      for (let y = 0; y < renderH; y += DENSITY) {
        for (let x = 0; x < renderW; x += DENSITY) {
          if (data[(y * renderW + x) * 4 + 3] > 128) {
            points.push({ x: x + offsetX, y: y + offsetY });
          }
        }
      }

      const count = points.length;
      if (!count) return;

      const cx = width / 2;
      const cy = height / 2;
      const sphereR = Math.min(width, height) * (isMobile ? 0.24 : 0.2);
      const logoR = Math.max(renderW, renderH) * 0.55;

      const spherePositions = Array.from({ length: count }, (_, index) => {
        const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;

        return {
          x: sphereR * Math.sin(phi) * Math.cos(theta),
          y: sphereR * Math.sin(phi) * Math.sin(theta),
          z: sphereR * Math.cos(phi),
        };
      });

      const shuffledIndexes = shuffleIndexes(count);

      for (let i = 0; i < count; i += 1) {
        const point = points[i];
        const spherePosition = spherePositions[shuffledIndexes[i]];

        const dx = (point.x - cx) / logoR;
        const dy = (point.y - cy) / logoR;
        const d2 = dx * dx + dy * dy;
        const zNorm = d2 < 1 ? Math.sqrt(1 - d2) : 0.05;
        const domeDepth = isMobile ? 120 : 180;
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
    }

    function resize() {
      const { w, h } = getCanvasSize();
      width = w;
      height = h;
      canvas.width = width;
      canvas.height = height;

      if (width > 10 && height > 10) {
        initParticles();
        initialized = true;
      }
    }

    function animate(now: number) {
      animationFrame = requestAnimationFrame(animate);

      if (!initialized || !particles.length) return;

      ctx.clearRect(0, 0, width, height);

      sphereVel += (sphereTarget - sphereT) * SPHERE_ACCEL;
      sphereVel *= SPHERE_FRICTION;
      sphereT += sphereVel;
      sphereT = Math.max(0, Math.min(1, sphereT));

      sphereAngle += 0.008 * sphereT;
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
      const cosRx = Math.cos(tiltX);
      const sinRx = Math.sin(tiltX);
      const cosRy = Math.cos(tiltY);
      const sinRy = Math.sin(tiltY);
      const cx = width / 2;
      const cy = height / 2;

      for (const particle of particles) {
        const rx =
          particle.sphereX * sphereCosA - particle.sphereZ * sphereSinA;
        const rz =
          particle.sphereX * sphereSinA + particle.sphereZ * sphereCosA;
        const ry = particle.sphereY * sphereCosB - rz * sphereSinB;
        const rz2 = particle.sphereY * sphereSinB + rz * sphereCosB;

        const lx = particle.logoX - cx;
        const ly = particle.logoY - cy;
        const lz = particle.logoZ;
        const lx2 = lx * cosRy + lz * sinRy;
        const lz2 = -lx * sinRy + lz * cosRy;
        const ly2 = ly * cosRx - lz2 * sinRx;
        const lz3 = ly * sinRx + lz2 * cosRx;

        particle.originX = (1 - sphereT) * (cx + lx2) + sphereT * (cx + rx);
        particle.originY = (1 - sphereT) * (cy + ly2) + sphereT * (cy + ry);
        particle.originZ = (1 - sphereT) * lz3 + sphereT * rz2;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && sphereT < 0.5) {
          const force = (mouse.radius - dist) / mouse.radius;
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
        const sx = cx + (particle.x - cx) * scale3d;
        const sy = cy + (particle.y - cy) * scale3d;
        const drawSize = particle.size * scale3d;
        const depth = Math.max(0, Math.min(1, (particle.z + 300) / 600));
        const light = 16 + depth * 56;
        const alpha = 0.1 + depth * 0.88;

        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(drawSize, 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, ${particle.sat}%, ${light}%, ${alpha})`;
        ctx.fill();

        if (depth > 0.85) {
          ctx.beginPath();
          ctx.arc(
            sx - drawSize * 0.3,
            sy - drawSize * 0.3,
            drawSize * 0.3,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `rgba(255,230,230,${(depth - 0.85) * 1.8})`;
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
          mouse.radius,
        );
        gradient.addColorStop(0, "rgba(255,50,50,0.08)");
        gradient.addColorStop(1, "rgba(255,0,0,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const updateMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    const onMouseMove = (event: MouseEvent) =>
      updateMousePosition(event.clientX, event.clientY);
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
      if (!event.touches[0]) return;
      updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
      sphereTarget = 1;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
    };
    const onTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      sphereTarget = 0;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);

  resize();
  animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
