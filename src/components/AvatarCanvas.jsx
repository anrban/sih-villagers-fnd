import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// This component creates and animates our liquid-like water droplet
function WaterDroplet() {
  const meshRef = useRef();

  // useMemo caches the complex geometry, improving performance.
  const geometry = useMemo(() => new THREE.SphereGeometry(1.5, 64, 64), []);

  // useFrame runs on every frame to create the animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = geometry.attributes.position.array;

    // This loop animates the geometry's vertices to create a smooth, organic wobble effect
    for (let i = 0; i < positions.length; i += 3) {
      const p = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
      const noise = 0.08 * Math.sin(p.y * 4 + time) + 0.08 * Math.cos(p.x * 4 + time);
      p.normalize().multiplyScalar(1.5 + noise); // 1.5 is the base radius, noise creates the wobble
      positions[i] = p.x;
      positions[i + 1] = p.y;
      positions[i + 2] = p.z;
    }
    geometry.attributes.position.needsUpdate = true; // Tell Three.js to apply the changes
    geometry.computeVertexNormals(); // Recalculate lighting for the new shape
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {/* meshPhysicalMaterial is perfect for realistic materials like water or glass. */}
      <meshPhysicalMaterial
        color="#94d2bd"    // A soft mint color (from your palette)
        transmission={1.0}  // Makes it fully transparent
        roughness={0.05}    // Makes the surface shiny and smooth
        thickness={1.5}     // Simulates the thickness for light refraction
        ior={1.33}          // Index of Refraction for water
        metalness={0.1}
      />
    </mesh>
  );
}

// This is the main canvas component that renders our 3D scene
export default function AvatarCanvas() {
  return (
    <div className="w-full h-64 md:h-96 rounded-2xl cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Environment adds realistic lighting and reflections from a "sunset" scene */}
        <Environment preset="sunset" />
        
        {/* Lights to illuminate the droplet */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        {/* PresentationControls allows the user to rotate the object */}
        <PresentationControls global polar={[-0.3, 0.3]} azimuth={[-0.5, 0.5]}>
          <WaterDroplet />
        </PresentationControls>
      </Canvas>
    </div>
  );
}