"use client";

import { useEffect, useRef } from "react";
import RAW_POINTS_JSON from "./raw-points.json";

const BASE_RX = 142 * Math.PI / 180;
const BASE_RY = -152 * Math.PI / 180;
const BASE_RZ = 163 * Math.PI / 180;

const RETURN_SPEED = 0.025;
const FRICTION      = 0.89;

type Particle = {
  x: number; y: number; z: number;
  sphereX: number; sphereY: number; sphereZ: number;
  logoX: number; logoY: number; logoZ: number;
  originX: number; originY: number; originZ: number;
  vx: number; vy: number; vz: number;
  size: number;
  hue: number; sat: number;
  phase: number; phase2: number; phase3: number;
  floatAmp: number; floatSpeed: number;
  popFreq: number; popPhase: number; popAmp: number;
  hoverGlow: number;
};

type ParticleLogoProps = { className?: string };

function shuffleIndexes(length: number) {
  const indexes = Array.from({ length }, (_, i) => i);
  let seed = 12345;
  const rng = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
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

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;
    let initialized = false;
    let sphereAngle = 0;
    let sphereT = 0, sphereTarget = 0, sphereVel = 0;

    const mouse = { x: -9999, y: -9999, radius: 160 };
    const RAW_POINTS = RAW_POINTS_JSON as [number, number, number][];

    const initParticles = () => {
      particles = [];
      const skip = isTouchDevice ? 2 : 1;
      const used: [number, number, number][] = [];
      for (let i = 0; i < RAW_POINTS.length; i += skip) used.push(RAW_POINTS[i]);

      const count = used.length;
      const modelScale = Math.min(W, H) * 0.32;
      const sphereR = modelScale * 0.95;
      const mb = isTouchDevice ? 1.3 : 1;

      const spherePos = Array.from({ length: count }, (_, i) => {
        const phi   = Math.acos(1 - (2 * (i + 0.5)) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        return {
          x: sphereR * Math.sin(phi) * Math.cos(theta),
          y: sphereR * Math.sin(phi) * Math.sin(theta),
          z: sphereR * Math.cos(phi),
        };
      });

      const shuffled = shuffleIndexes(count);

      for (let i = 0; i < count; i++) {
        const pt = used[i];
        const sp = spherePos[shuffled[i]];
        const lx = pt[0] * modelScale;
        const ly = pt[1] * modelScale;
        const lz = pt[2] * modelScale;

        const phase  = Math.random() * Math.PI * 2;
        const phase2 = Math.random() * Math.PI * 2;
        const phase3 = Math.random() * Math.PI * 2;
        const floatAmp   = (2 + Math.random() * 4) * mb;
        const floatSpeed = (0.001 + Math.random() * 0.002) * (isTouchDevice ? 1.3 : 1);
        const wild       = Math.random();
        const wildFactor = wild > (isTouchDevice ? 0.7 : 0.82) ? 2.5 + Math.random() * 3.5 : 1;
        const popFreq    = 0.0003 + Math.random() * 0.0007;
        const popPhase   = Math.random() * Math.PI * 2;
        const popAmp     = (wild > 0.6 ? 8 + Math.random() * 20 : 2 + Math.random() * 6) * mb;

        particles.push({
          x: W / 2 + lx, y: H / 2 + ly, z: lz,
          sphereX: sp.x, sphereY: sp.y, sphereZ: sp.z,
          logoX: lx, logoY: ly, logoZ: lz,
          originX: W / 2 + lx, originY: H / 2 + ly, originZ: lz,
          vx: 0, vy: 0, vz: 0,
          size: isTouchDevice ? 0.6 + Math.random() * 0.7 : 1.2 + Math.random() * 1.4,
          hue: 352 + Math.random() * 16,
          sat: 72  + Math.random() * 26,
          phase, phase2, phase3,
          floatAmp: floatAmp * wildFactor,
          floatSpeed,
          popFreq, popPhase, popAmp,
          hoverGlow: 0,
        });
      }
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = canvas.width  = Math.max(1, Math.floor(rect?.width  || window.innerWidth  || 800));
      H = canvas.height = Math.max(1, Math.floor(rect?.height || window.innerHeight || 600));
      if (W > 10 && H > 10) { initParticles(); initialized = true; }
    };

    const animate = (now: number) => {
      animationFrame = requestAnimationFrame(animate);
      if (!initialized || !particles.length) {
        if (W > 10 && H > 10 && !initialized) resize();
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // Sphere morph
      if (!isTouchDevice) {
        sphereVel += (sphereTarget - sphereT) * 0.004;
        sphereVel *= 0.92;
        sphereT = Math.max(0, Math.min(1, sphereT + sphereVel));
      }
      const t = sphereT;

      sphereAngle += 0.008 * t;
      const scA = Math.cos(sphereAngle), ssA = Math.sin(sphereAngle);
      const scB = Math.cos(sphereAngle * 0.7), ssB = Math.sin(sphereAngle * 0.7);

      // Idle sway
      const swayX = Math.sin(now * 0.00032) * 0.07 + Math.sin(now * 0.00078) * 0.03;
      const swayY = Math.cos(now * 0.00045) * 0.06 + Math.cos(now * 0.00090) * 0.025;
      const swayZ = Math.sin(now * 0.00028) * 0.035;
      const levY  = Math.sin(now * 0.0007) * 10 + Math.sin(now * 0.0013) * 4;

      const tRx = BASE_RX + swayX, tRy = BASE_RY + swayY, tRz = BASE_RZ + swayZ;
      const cUx = Math.cos(tRx), sUx = Math.sin(tRx);
      const cUy = Math.cos(tRy), sUy = Math.sin(tRy);
      const cUz = Math.cos(tRz), sUz = Math.sin(tRz);

      const cx = W / 2, cy = H / 2;
      const mouseActive = !isTouchDevice && mouse.x > 0 && mouse.y > 0;

      for (const p of particles) {
        // --- Sphere rotation ---
        const rx  = p.sphereX * scA - p.sphereZ * ssA;
        const rz  = p.sphereX * ssA + p.sphereZ * scA;
        const ry  = p.sphereY * scB - rz * ssB;
        const rz2 = p.sphereY * ssB + rz * scB;

        // --- Logo rotation (Euler XYZ) ---
        const x1 = p.logoX * cUy + p.logoZ * sUy;
        const z1 = -p.logoX * sUy + p.logoZ * cUy;
        const y1 = p.logoY * cUx - z1 * sUx;
        const z2 = p.logoY * sUx + z1 * cUx;
        const x2 = x1 * cUz - y1 * sUz;
        const y2 = x1 * sUz + y1 * cUz;

        // --- Float + pop ---
        const ft     = now * p.floatSpeed;
        const floatX = Math.sin(ft + p.phase)            * p.floatAmp
                     + Math.sin(ft * 1.7 + p.phase2)     * p.floatAmp * 0.4;
        const floatY = Math.cos(ft * 0.9 + p.phase + 1.3) * p.floatAmp
                     + Math.cos(ft * 1.4 + p.phase3)      * p.floatAmp * 0.3;
        const floatZ = Math.sin(ft * 0.7 + p.phase + 2.7) * p.floatAmp * 0.6;

        const popVal = Math.sin(now * p.popFreq + p.popPhase);
        const popPow = Math.max(0, popVal * popVal * popVal);
        const norm   = Math.abs(x2) + Math.abs(y2) + Math.abs(z2) + 1;

        p.originX = (1 - t) * (cx + x2 + floatX + (x2 / norm) * popPow * p.popAmp) + t * (cx + rx);
        p.originY = (1 - t) * (cy + y2 + levY + floatY + (y2 / norm) * popPow * p.popAmp) + t * (cy + ry);
        p.originZ = (1 - t) * (z2 + floatZ + (z2 / norm) * popPow * p.popAmp)             + t * rz2;

        // --- Hover (3 zones) ---
        if (mouseActive && t < 0.5) {
          const dx   = mouse.x - p.x, dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const R    = mouse.radius;
          if (dist < R) {
            const f       = (R - dist) / R;
            const angle   = Math.atan2(dy, dx);
            const ringPos = dist / R;
            if (ringPos < 0.35) {
              p.vx -= Math.cos(angle) * f * 6;
              p.vy -= Math.sin(angle) * f * 6;
              p.vz += f * 4;
            } else if (ringPos < 0.7) {
              p.vx += -Math.sin(angle) * f * 3 - Math.cos(angle) * f * 1.5;
              p.vy +=  Math.cos(angle) * f * 3 - Math.sin(angle) * f * 1.5;
              p.vz += f * 2;
            } else {
              p.vx += Math.cos(angle) * f * 1.2;
              p.vy += Math.sin(angle) * f * 1.2;
            }
            p.hoverGlow = Math.min(1, p.hoverGlow + 0.08);
          } else {
            p.hoverGlow = Math.max(0, p.hoverGlow - 0.03);
          }
        } else {
          p.hoverGlow = Math.max(0, p.hoverGlow - 0.03);
        }

        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;
        p.vz += (p.originZ - p.z) * RETURN_SPEED;
        p.vx *= FRICTION; p.vy *= FRICTION; p.vz *= FRICTION;
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
      }

      particles.sort((a, b) => a.z - b.z);

      const perspective = 500;
      const maxZ = Math.min(W, H) * 0.4;

      for (const p of particles) {
        const s3d      = perspective / (perspective + p.z);
        const sx       = cx + (p.x - cx) * s3d;
        const sy       = cy + (p.y - cy) * s3d;
        const drawSize = p.size * s3d;
        const dn       = Math.max(0, Math.min(1, (p.z + maxZ) / (maxZ * 2)));
        const g        = p.hoverGlow;
        const light    = 30 + dn * 25 - g * 3;
        const alpha    = Math.max(0.2, 0.35 + dn * 0.65 - g * 0.15);
        const sat      = Math.min(100, p.sat + g * 10);
        const sz       = Math.max(drawSize * (1 - g * 0.2), 0.4);

        ctx.beginPath();
        ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},${sat}%,${light}%,${alpha})`;
        ctx.fill();

        if (dn > 0.82 && g < 0.2) {
          ctx.beginPath();
          ctx.arc(sx - drawSize * 0.3, sy - drawSize * 0.3, drawSize * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,170,160,${(dn - 0.82) * 2})`;
          ctx.fill();
        }
      }

      // Minimal cursor dot
      if (mouseActive) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,50,50,0.2)";
        ctx.fill();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onMouseDown  = () => { if (!isTouchDevice) sphereTarget = 1; };
    const onMouseUp    = () => { if (!isTouchDevice) sphereTarget = 0; };

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);
    window.addEventListener("resize",     resize);

    resize();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
      window.removeEventListener("resize",     resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}