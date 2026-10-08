import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      // React to mouse
      globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, mouse.y * 0.2, 0.1);
      globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, mouse.x * 0.2, 0.1);
    }
  });

  return (
    <group ref={globeRef}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#0B100D" transparent opacity={0.8} wireframe />
      </Sphere>
      <Sphere args={[1.98, 32, 32]}>
        <meshBasicMaterial color="#030504" />
      </Sphere>
      {/* Simple trajectory line */}
      <Line
        points={[
          [-2.5, 0.5, 0],
          [-1.5, 1.5, 1],
          [0, 2.2, 0],
          [1.5, 1.5, 1],
        ]}
        color="#2F8F46"
        lineWidth={2}
        dashed
        dashScale={50}
        dashSize={1}
        dashOffset={0}
      />
    </group>
  );
};

const GlobeScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Globe />
    </Canvas>
  );
};

export default GlobeScene;
