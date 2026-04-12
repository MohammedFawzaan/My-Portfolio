"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TerrainWave() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a base plane geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(30, 20, 60, 40);
  }, []);

  // Store original z positions
  const originalPositions = useMemo(() => {
    const positions = geometry.attributes.position.array;
    const orig = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i++) {
      orig[i] = positions[i];
    }
    return orig;
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      // Create a flowing wave effect using sine waves based on x, y, and time
      const wave1 = Math.sin(x * 0.5 + t * 1.5) * 0.5;
      const wave2 = Math.cos(y * 0.3 + t * 1.2) * 0.5;
      const wave3 = Math.sin((x + y) * 0.2 + t) * 0.3;
      
      positions[i + 2] = wave1 + wave2 + wave3;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -5]}>
      <meshStandardMaterial 
        color="#06B6D4" 
        wireframe={true} 
        transparent 
        opacity={0.3} 
        emissive="#06B6D4"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <fog attach="fog" args={["#0B0F19", 5, 20]} />
        <ambientLight intensity={0.5} />
        <TerrainWave />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10" />
    </div>
  );
}
