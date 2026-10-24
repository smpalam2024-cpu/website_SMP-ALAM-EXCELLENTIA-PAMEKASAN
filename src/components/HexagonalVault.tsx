import React, { useEffect, useRef, useCallback } from 'react';

interface HexagonalVaultProps {
  /** Number of columns in the hex grid */
  cols?: number;
  /** Number of rows in the hex grid */
  rows?: number;
  /** Hex border color (CSS color string) */
  hexColor?: string;
  /** Cursor glow color (CSS color string, use rgba for transparency) */
  glowColor?: string;
  /** Radius of the light glow in pixels */
  glowRadius?: number;
  /** Max opacity of a lit hexagon (0-1) */
  maxOpacity?: number;
  /** Extra className for the outer wrapper */
  className?: string;
  /** Children rendered on top of the vault */
  children?: React.ReactNode;
}

/**
 * HexagonalVault
 * A canvas-powered hexagon grid lit by a soft spotlight that follows the cursor.
 * Built from scratch — no paid libraries required.
 */
export function HexagonalVault({
  cols = 18,
  rows = 10,
  hexColor = 'rgba(34, 197, 94, 0.25)',    // green-500/25
  glowColor = 'rgba(250, 204, 21, 0.55)',   // yellow-400/55
  glowRadius = 180,
  maxOpacity = 0.9,
  className = '',
  children,
}: HexagonalVaultProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Geometry helpers ─────────────────────────────────────────────────────────
  const getHexPoints = (cx: number, cy: number, r: number): string => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
  };

  // ── Draw ─────────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Hex sizing — fit `cols` columns into width
    const hexR = W / (cols * 1.75);
    const hexW = hexR * Math.sqrt(3);
    const hexH = hexR * 2;
    const colSpacing = hexW;
    const rowSpacing = hexH * 0.75;

    ctx.clearRect(0, 0, W, H);

    // Total rows needed to cover height
    const totalRows = Math.ceil(H / rowSpacing) + 2;
    const totalCols = Math.ceil(W / colSpacing) + 2;

    for (let row = -1; row < totalRows; row++) {
      for (let col = -1; col < totalCols; col++) {
        const xOffset = row % 2 === 0 ? 0 : hexW / 2;
        const cx = col * colSpacing + xOffset;
        const cy = row * rowSpacing;

        // Distance from cursor centre to hex centre
        let brightness = 0;
        if (mouseRef.current) {
          const dx = cx - mouseRef.current.x;
          const dy = cy - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          brightness = Math.max(0, 1 - dist / glowRadius);
          brightness = Math.pow(brightness, 1.5); // smooth falloff
        }

        // Build hex path
        ctx.beginPath();
        const pts = getHexPoints(cx, cy, hexR - 1).split(' ');
        pts.forEach((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();

        // Fill: blend base color with glow color based on brightness
        if (brightness > 0.01) {
          // Parse glow color for blending
          ctx.fillStyle = glowColor.replace(
            /rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
            `rgba($1,$2,$3,${(brightness * maxOpacity).toFixed(3)})`
          );
        } else {
          ctx.fillStyle = 'transparent';
        }
        ctx.fill();

        // Stroke: hex border
        ctx.strokeStyle = hexColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }, [cols, hexColor, glowColor, glowRadius, maxOpacity]);

  // ── Animation loop ────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  // ── Resize handler ────────────────────────────────────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }, []);

  // ── Mouse / Touch tracking ────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }, []);

  // ── Lifecycle ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [handleResize, handleMouseMove, handleMouseLeave, handleTouchMove, loop]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Hex grid canvas — sits behind children */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      />
      {/* Mouse event capture layer */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1 }}
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }}
        onMouseLeave={() => { mouseRef.current = null; }}
        onTouchMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect || !e.touches[0]) return;
          mouseRef.current = {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
          };
        }}
      />
      {/* Content layer */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
