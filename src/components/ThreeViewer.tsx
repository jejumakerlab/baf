"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import type { DetectedObject } from "@/types";

interface ThreeViewerProps {
  imageUrl: string;
  detectedObjects: DetectedObject[];
}

const PLANE_W = 10;
const PLANE_H = 10;
const SEGMENTS = 256;
const DISP_SCALE = 1.2;

/* ── Braille unicode decoder ── */

// Braille cell layout:
//  dot1  dot4
//  dot2  dot5
//  dot3  dot6
const DOT_CELL: { col: number; row: number }[] = [
  { col: 0, row: 2 }, // dot 1
  { col: 0, row: 1 }, // dot 2
  { col: 0, row: 0 }, // dot 3
  { col: 1, row: 2 }, // dot 4
  { col: 1, row: 1 }, // dot 5
  { col: 1, row: 0 }, // dot 6
];

function parseBrailleDots(char: string): boolean[] {
  const code = char.charCodeAt(0);
  if (code < 0x2800 || code > 0x28ff) return Array(6).fill(false);
  const bits = code - 0x2800;
  return [
    !!(bits & 0x01),
    !!(bits & 0x02),
    !!(bits & 0x04),
    !!(bits & 0x08),
    !!(bits & 0x10),
    !!(bits & 0x20),
  ];
}

/* ── Main Component ── */

export default function ThreeViewer({ imageUrl, detectedObjects }: ThreeViewerProps) {
  const labels = detectedObjects.map((o) => o.label).join(", ");

  return (
    <div
      role="img"
      aria-label={`업로드된 이미지의 3D 부조 및 점자 시뮬레이션. ${detectedObjects.length}개 객체(${labels}) 표시. 마우스 드래그 또는 터치로 회전 가능.`}
    >
      <div
        className="overflow-hidden rounded-2xl border shadow-sm"
        style={{ borderColor: "var(--border-light)" }}
      >
        <div className="h-[400px] w-full sm:h-[520px]">
          <Canvas
            camera={{ position: [0, 3, 12], fov: 45 }}
            gl={{ antialias: true }}
            aria-hidden="true"
          >
            <SceneLighting />
            <ReliefPlane imageUrl={imageUrl} />
            {detectedObjects.map((obj, idx) => (
              <BrailleOverlay key={idx} object={obj} />
            ))}
            <OrbitControls
              enablePan
              enableZoom
              minDistance={5}
              maxDistance={20}
              autoRotate
              autoRotateSpeed={0.6}
            />
          </Canvas>
        </div>

        {/* Info bar */}
        <div
          className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "var(--border-light)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <p
            className="text-xs sm:text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            마우스나 터치로 3D 부조 모델을 회전·확대해 보세요.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {detectedObjects.map((obj, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: "var(--accent-subtle)",
                  color: "var(--accent)",
                }}
              >
                {obj.label}
                <span className="tracking-widest opacity-70">{obj.braille}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Lighting ── */

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.4}
        color="#b3c5e1"
      />
      <pointLight position={[0, -4, 5]} intensity={0.3} color="#8da8d2" />
    </>
  );
}

/* ── Relief Plane (image texture + displacement) ── */

function ReliefPlane({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);

  return (
    <mesh>
      <planeGeometry args={[PLANE_W, PLANE_H, SEGMENTS, SEGMENTS]} />
      <meshStandardMaterial
        map={texture}
        displacementMap={texture}
        displacementScale={DISP_SCALE}
        roughness={0.65}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Braille dot overlay per detected object ── */

function BrailleOverlay({ object }: { object: DetectedObject }) {
  const { boundingBox, braille, label } = object;

  const centerX =
    ((boundingBox.xmin + boundingBox.xmax) / 2) * PLANE_W - PLANE_W / 2;
  const centerY =
    -(((boundingBox.ymin + boundingBox.ymax) / 2) * PLANE_H - PLANE_H / 2);
  const z = DISP_SCALE + 0.5;

  const dots = useMemo(() => {
    const positions: [number, number, number][] = [];
    const dotSpacing = 0.13;
    const charWidth = dotSpacing * 2;
    const charGap = 0.1;

    const chars = [...braille];
    const totalWidth = chars.length * (charWidth + charGap) - charGap;
    const startX = -totalWidth / 2;

    chars.forEach((char, ci) => {
      const bits = parseBrailleDots(char);
      const charX = startX + ci * (charWidth + charGap);

      bits.forEach((raised, di) => {
        if (!raised) return;
        const { col, row } = DOT_CELL[di];
        positions.push([
          centerX + charX + col * dotSpacing,
          centerY + (row - 1) * dotSpacing,
          z,
        ]);
      });
    });

    return positions;
  }, [braille, centerX, centerY, z]);

  return (
    <group>
      {/* 3D braille dot spheres */}
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 14, 14]} />
          <meshStandardMaterial
            color="#FFD700"
            roughness={0.25}
            metalness={0.3}
            emissive="#FFD700"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Floating label */}
      <Html
        position={[centerX, centerY - 0.6, z + 0.1]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.78)",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            fontFamily: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
