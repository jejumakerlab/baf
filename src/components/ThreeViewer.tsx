"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ThreeViewerProps {
  detectedObject: string;
  brailleText: string;
}

export default function ThreeViewer({
  detectedObject,
  brailleText,
}: ThreeViewerProps) {
  return (
    <div
      role="img"
      aria-label={`${detectedObject}의 3D 촉각 교구 모델 미리보기. 마우스 드래그 또는 터치로 회전할 수 있습니다.`}
    >
      <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ borderColor: "var(--border-light)" }}>
        <div className="h-[340px] w-full sm:h-[440px]">
          <Canvas
            camera={{ position: [3, 2.5, 3], fov: 45 }}
            gl={{ antialias: true }}
            aria-hidden="true"
          >
            <SceneLighting />
            <TactileModel />
            <BrailleDots />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3}
              maxDistance={8}
              autoRotate
              autoRotateSpeed={1.2}
            />
          </Canvas>
        </div>

        <div
          className="flex items-center justify-between gap-4 border-t px-6 py-4"
          style={{ borderColor: "var(--border-light)", backgroundColor: "var(--bg-card)" }}
        >
          <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
            마우스나 터치로 모델을 이리저리 돌려보세요.
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: "var(--accent-subtle)", color: "var(--accent)" }}
            >
              {detectedObject}
            </span>
            <span
              className="text-lg tracking-widest"
              style={{ color: "var(--accent)" }}
              aria-label={`점자: ${brailleText}`}
            >
              {brailleText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#e8ecf4" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.4}
        color="#b3c5e1"
      />
      <pointLight position={[0, -3, 3]} intensity={0.3} color="#8da8d2" />
    </>
  );
}

function TactileModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.2} smoothness={4}>
        <meshStandardMaterial
          color="#3a5a8a"
          roughness={0.55}
          metalness={0.1}
        />
      </RoundedBox>
    </group>
  );
}

function BrailleDots() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const dots = useMemo(() => {
    const positions: [number, number, number][] = [];
    const dotSpacing = 0.28;
    const dotRadius = 0.07;
    const halfSize = 0.9 + dotRadius;

    const brailleGrid = [
      [1, 0, 1],
      [1, 1, 0],
      [0, 1, 1],
      [1, 0, 1],
    ];

    const faces: { axis: "x" | "y" | "z"; sign: 1 | -1 }[] = [
      { axis: "z", sign: 1 },
      { axis: "z", sign: -1 },
      { axis: "x", sign: 1 },
      { axis: "x", sign: -1 },
      { axis: "y", sign: 1 },
      { axis: "y", sign: -1 },
    ];

    faces.forEach((face) => {
      for (let row = 0; row < brailleGrid.length; row++) {
        for (let col = 0; col < brailleGrid[row].length; col++) {
          if (!brailleGrid[row][col]) continue;

          const u = (col - 1) * dotSpacing;
          const v = (1.5 - row) * dotSpacing;

          let pos: [number, number, number];
          if (face.axis === "z") {
            pos = [u, v, halfSize * face.sign];
          } else if (face.axis === "x") {
            pos = [halfSize * face.sign, v, u];
          } else {
            pos = [u, halfSize * face.sign, v];
          }
          positions.push(pos);
        }
      }
    });

    return { positions, dotRadius };
  }, []);

  return (
    <group ref={groupRef}>
      {dots.positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[dots.dotRadius, 16, 16]} />
          <meshStandardMaterial
            color="#d9e2f0"
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
