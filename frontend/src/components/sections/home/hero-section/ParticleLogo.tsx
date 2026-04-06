'use client';

import { useEffect, useRef } from 'react';

const SVG_PATH =
  'M1035.99 614.718C1018.6 632.486 1000.64 637.801 938.184 637.801C864.692 637.801 861.671 637.338 861.671 637.338H660.269C631.406 678.802 584.089 705.881 530.553 705.881C442.656 705.881 371.401 632.967 371.401 543.002C371.401 453.02 442.66 380.088 530.553 380.088C582.879 380.088 629.301 405.943 658.311 445.84H860.078C818.372 300.667 687.046 194.373 531.897 194.373C343.312 194.373 189.898 351.411 189.898 544.431C189.898 737.468 343.312 894.494 531.897 894.494C627.691 894.494 714.41 853.969 776.545 788.786C776.545 788.786 847.035 788.279 913.45 788.279C916.248 788.279 937.789 788.279 940.315 788.279C980.652 788.279 987.045 821.402 972.569 842.121C970.963 844.404 965.753 852.696 963.974 855.295C934.265 898.896 920.879 913.824 883.532 948.002C789.682 1033.8 665.941 1086 530.504 1086C237.97 1086 0 842.428 0 543.02C0 243.608 237.971 0 530.5 0C823.007 0 1061 243.608 1061 543.02C1061 566.939 1055.74 594.547 1035.99 614.718Z';

const DENSITY = 6;
const RETURN_SPEED = 0.04;
const FRICTION = 0.86;
const REPULSE_FORCE = 12;

const HOLD_SPHERE = 3000;
const MORPH_TO_LOGO = 2500;
const HOLD_LOGO = 4000;
const MORPH_TO_SPHERE = 2500;
const CYCLE = HOLD_SPHERE + MORPH_TO_LOGO + HOLD_LOGO + MORPH_TO_SPHERE;

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
  baseLight: number;
};

type SampledLogo = {
  points: { x: number; y: number }[];
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
  };
};

export function ParticleLogo({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const canvas = canvasEl;
    const context = ctx;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let startTime = performance.now();
    let animId = 0;
    let autoAngle = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 150,
    };

   function getAnchor() {
      const isMobile = W < 768;
      const baseY = isMobile ? H * 0.24 : H * 0.34;

      return {
        x: W / 2,
        y: baseY + 40,
      };
    }

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function getMorphT(now: number) {
      const elapsed = (now - startTime) % CYCLE;

      if (elapsed < HOLD_SPHERE) return 0;

      if (elapsed < HOLD_SPHERE + MORPH_TO_LOGO) {
        return easeInOutCubic((elapsed - HOLD_SPHERE) / MORPH_TO_LOGO);
      }

      if (elapsed < HOLD_SPHERE + MORPH_TO_LOGO + HOLD_LOGO) {
        return 1;
      }

      return (
        1 -
        easeInOutCubic(
          (elapsed - HOLD_SPHERE - MORPH_TO_LOGO - HOLD_LOGO) /
            MORPH_TO_SPHERE
        )
      );
    }

    function sampleLogoPoints(): SampledLogo {
      const svgW = 1061;
      const svgH = 1086;

      const isMobile = W < 768;
const scaleFactor = isMobile ? 0.6 : 0.52;
const scale = Math.min((W * scaleFactor) / svgW, (H * scaleFactor) / svgH);

const renderW = Math.max(Math.floor(svgW * scale), 2);
const renderH = Math.max(Math.floor(svgH * scale), 2);


      const offscreen = document.createElement('canvas');
      offscreen.width = renderW;
      offscreen.height = renderH;

      const offCtx = offscreen.getContext('2d');
      if (!offCtx) {
        return {
          points: [],
          bounds: {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            width: 0,
            height: 0,
          },
        };
      }

      offCtx.scale(scale, scale);
      offCtx.fillStyle = '#fff';
      offCtx.fill(new Path2D(SVG_PATH));
      offCtx.setTransform(1, 0, 0, 1, 0, 0);

      const imageData = offCtx.getImageData(0, 0, renderW, renderH);
      const data = imageData.data;

      const anchor = getAnchor();
      const offsetX = anchor.x - renderW / 2;
      const offsetY = anchor.y - renderH / 2;

      const points: { x: number; y: number }[] = [];

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (let y = 0; y < renderH; y += DENSITY) {
        for (let x = 0; x < renderW; x += DENSITY) {
          if (data[(y * renderW + x) * 4 + 3] > 128) {
            const px = x + offsetX;
            const py = y + offsetY;

            points.push({ x: px, y: py });

            if (px < minX) minX = px;
            if (py < minY) minY = py;
            if (px > maxX) maxX = px;
            if (py > maxY) maxY = py;
          }
        }
      }

      if (!points.length) {
        return {
          points: [],
          bounds: {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            width: 0,
            height: 0,
          },
        };
      }

      return {
        points,
        bounds: {
          minX,
          minY,
          maxX,
          maxY,
          width: maxX - minX,
          height: maxY - minY,
        },
      };
    }

    function logoZ(px: number, py: number, cx: number, cy: number) {
      const dx = (px - cx) / (W * 0.35);
      const dy = (py - cy) / (H * 0.35);
      const d = Math.min(Math.sqrt(dx * dx + dy * dy), 1);

      return (1 - d * d) * 80 + (Math.random() - 0.5) * 16;
    }

    function initParticles() {
      particles = [];

      const { points: logoPoints, bounds } = sampleLogoPoints();
      if (!logoPoints.length) return;

      const anchor = getAnchor();
      const cx = anchor.x;
      const cy = anchor.y;

      const logoRadius = Math.max(bounds.width, bounds.height) / 2;
      const sphereR = logoRadius * 0.92;

      for (let i = 0; i < logoPoints.length; i++) {
        const lp = logoPoints[i];

        const phi = Math.acos(1 - (2 * (i + 0.5)) / logoPoints.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const sx = sphereR * Math.sin(phi) * Math.cos(theta);
        const sy = sphereR * Math.sin(phi) * Math.sin(theta);
        const sz = sphereR * Math.cos(phi);
        const lz = logoZ(lp.x, lp.y, cx, cy);

        particles.push({
          x: cx + sx,
          y: cy + sy,
          z: sz,
          sphereX: sx,
          sphereY: sy,
          sphereZ: sz,
          logoX: lp.x,
          logoY: lp.y,
          logoZ: lz,
          originX: cx + sx,
          originY: cy + sy,
          originZ: sz,
          vx: 0,
          vy: 0,
          vz: 0,
          size: 1.4 + Math.random() * 1.3,
          hue: 354 + Math.random() * 14,
          sat: 75 + Math.random() * 22,
          baseLight: 44 + Math.random() * 22,
        });
      }
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));

      canvas.width = W;
      canvas.height = H;

      if (W > 10 && H > 10) {
        initParticles();
        startTime = performance.now();
      }
    }

    function animate(now: number) {
      animId = requestAnimationFrame(animate);

      if (!particles.length) return;

      context.clearRect(0, 0, W, H);

      const t = getMorphT(now);

      const sphereSpeed = 0.005;
      const logoWobble = 0.0008;
      autoAngle += sphereSpeed * (1 - t) + logoWobble * t;

      const cosA = Math.cos(autoAngle);
      const sinA = Math.sin(autoAngle);
      const cosB = Math.cos(autoAngle * 0.7);
      const sinB = Math.sin(autoAngle * 0.7);

      const logoTiltX = Math.sin(now * 0.0006) * 0.12 * t;
      const logoTiltY = Math.cos(now * 0.0008) * 0.1 * t;

      const cltx = Math.cos(logoTiltX);
      const sltx = Math.sin(logoTiltX);
      const clty = Math.cos(logoTiltY);
      const slty = Math.sin(logoTiltY);

      const anchor = getAnchor();
      const cx = anchor.x;
      const cy = anchor.y;

      for (const p of particles) {
        const rx = p.sphereX * cosA - p.sphereZ * sinA;
        const rz = p.sphereX * sinA + p.sphereZ * cosA;
        const ry = p.sphereY * cosB - rz * sinB;
        const rz2 = p.sphereY * sinB + rz * cosB;

        const lx = p.logoX - cx;
        const ly = p.logoY - cy;
        const lz = p.logoZ;

        const ly2 = ly * cltx - lz * sltx;
        const lz2 = ly * sltx + lz * cltx;
        const lx2 = lx * clty + lz2 * slty;
        const lz3 = -lx * slty + lz2 * clty;

        p.originX = (1 - t) * (cx + rx) + t * (cx + lx2);
        p.originY = (1 - t) * (cy + ry) + t * (cy + ly2);
        p.originZ = (1 - t) * rz2 + t * lz3;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          p.vx -= Math.cos(angle) * force * REPULSE_FORCE;
          p.vy -= Math.sin(angle) * force * REPULSE_FORCE;
          p.vz += force * 8;
        }

        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;
        p.vz += (p.originZ - p.z) * RETURN_SPEED;

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.vz *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
      }

      particles.sort((a, b) => a.z - b.z);

      const perspective = 550;
      const minZ = -260;
      const rangeZ = 520;

      for (const p of particles) {
        const s3d = perspective / (perspective + p.z);
        const sx = cx + (p.x - cx) * s3d;
        const sy = cy + (p.y - cy) * s3d;
        const drawSize = p.size * s3d;

        const dn = Math.max(0, Math.min(1, (p.z - minZ) / rangeZ));
        const light = 18 + dn * 55;
        const alpha = 0.1 + dn * 0.75;

        context.beginPath();
        context.arc(sx, sy, Math.max(drawSize, 0.3), 0, Math.PI * 2);
        context.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${light}%, ${alpha})`;
        context.fill();

        if (dn > 0.85) {
          context.beginPath();
          context.arc(
            sx - drawSize * 0.25,
            sy - drawSize * 0.25,
            drawSize * 0.35,
            0,
            Math.PI * 2
          );
          context.fillStyle = `rgba(255,255,255,${(dn - 0.85) * 1.2})`;
          context.fill();
        }
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    };

    const onTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', resize);

    resize();
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}