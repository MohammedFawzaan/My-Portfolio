"use client";
import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 220;
const CONNECTION_DISTANCE = 2.8;
const BOUNDS = { x: 16, y: 10, z: 8 };

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate random particle positions and velocities
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const cyanColor = new THREE.Color("#0891B2");
    const purpleColor = new THREE.Color("#7C3AED");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
      pos[i3 + 2] = (Math.random() - 0.5) * BOUNDS.z * 2;

      vel[i3] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.004;

      // Blend between cyan and purple based on position
      const blend = Math.random();
      const color = cyanColor.clone().lerp(purpleColor, blend);
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, []);

  // Pre-allocate line geometry (max possible connections)
  const maxLines = PARTICLE_COUNT * 12;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    geom.setDrawRange(0, 0);
    return geom;
  }, [linePositions, lineColors]);

  const pointGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const t = state.clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Move particles with gentle drift + subtle sine oscillation
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArr[i3] += velocities[i3] + Math.sin(t * 0.3 + i * 0.1) * 0.002;
      posArr[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(t * 0.2 + i * 0.15) * 0.002;
      posArr[i3 + 2] += velocities[i3 + 2];

      // Soft bounce off bounds
      if (Math.abs(posArr[i3]) > BOUNDS.x) velocities[i3] *= -1;
      if (Math.abs(posArr[i3 + 1]) > BOUNDS.y) velocities[i3 + 1] *= -1;
      if (Math.abs(posArr[i3 + 2]) > BOUNDS.z) velocities[i3 + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Build connections
    let lineIndex = 0;
    const cyan = new THREE.Color("#0891B2");
    const purple = new THREE.Color("#7C3AED");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3;
        const dx = posArr[i3] - posArr[j3];
        const dy = posArr[i3 + 1] - posArr[j3 + 1];
        const dz = posArr[i3 + 2] - posArr[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE && lineIndex < maxLines) {
          // Fade line alpha based on distance
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const midColor = cyan.clone().lerp(purple, alpha * 0.5);

          const li = lineIndex * 6;
          linePositions[li] = posArr[i3];
          linePositions[li + 1] = posArr[i3 + 1];
          linePositions[li + 2] = posArr[i3 + 2];
          linePositions[li + 3] = posArr[j3];
          linePositions[li + 4] = posArr[j3 + 1];
          linePositions[li + 5] = posArr[j3 + 2];

          // Colors fade with distance
          lineColors[li] = midColor.r * alpha;
          lineColors[li + 1] = midColor.g * alpha;
          lineColors[li + 2] = midColor.b * alpha;
          lineColors[li + 3] = midColor.r * alpha;
          lineColors[li + 4] = midColor.g * alpha;
          lineColors[li + 5] = midColor.b * alpha;

          lineIndex++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Slowly orbiting glow orbs for depth
function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Cyan orb */}
      <mesh position={[6, 3, -4]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#0891B2"
          transparent
          opacity={0.06}
        />
      </mesh>
      <pointLight
        position={[6, 3, -4]}
        color="#0891B2"
        intensity={2}
        distance={15}
        decay={2}
      />

      {/* Purple orb */}
      <mesh position={[-7, -2, -3]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.05}
        />
      </mesh>
      <pointLight
        position={[-7, -2, -3]}
        color="#7C3AED"
        intensity={1.5}
        distance={12}
        decay={2}
      />
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#F1F5F9"]} />
        <fog attach="fog" args={["#F1F5F9", 10, 28]} />
        <ParticleNetwork />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
