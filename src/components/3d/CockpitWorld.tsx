import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

// Interactive 3D Control Yoke / Flight Stick
const InteractiveFlightYoke = ({ pitch, roll }: { pitch: number; roll: number }) => {
  const yokeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (yokeRef.current) {
      yokeRef.current.rotation.z = THREE.MathUtils.lerp(
        yokeRef.current.rotation.z,
        (-roll * Math.PI) / 180,
        0.1
      );
      yokeRef.current.position.z = THREE.MathUtils.lerp(
        yokeRef.current.position.z,
        -1.3 + (pitch * 0.015),
        0.1
      );
    }
  });

  return (
    <group ref={yokeRef} position={[0, -0.65, -1.3]}>
      {/* Column shaft */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 0.8, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Yoke handle */}
      <group position={[0, 0, 0]}>
        {/* Center hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.09, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Left horn */}
        <mesh position={[-0.32, 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
          <capsuleGeometry args={[0.04, 0.36, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>

        {/* Right horn */}
        <mesh position={[0.32, 0.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <capsuleGeometry args={[0.04, 0.36, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>

        {/* Crossbar */}
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* AP Disengage Red Button */}
        <mesh position={[-0.24, 0.23, 0.02]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
};

// Cockpit Window Frame & Pillars with bright specular highlights
const CockpitWindowFrame = () => {
  return (
    <group position={[0, 0, -1.8]}>
      {/* Center windshield divider pillar */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.09, 1.8, 0.15]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top overhead frame */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[4.4, 0.14, 0.22]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Left side pillar angled */}
      <mesh position={[-1.8, 0.4, 0.2]} rotation={[0, 0.3, -Math.PI / 10]}>
        <boxGeometry args={[0.11, 1.9, 0.16]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right side pillar angled */}
      <mesh position={[1.8, 0.4, 0.2]} rotation={[0, -0.3, Math.PI / 10]}>
        <boxGeometry args={[0.11, 1.9, 0.16]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Glareshield / dashboard shelf */}
      <mesh position={[0, -0.35, 0.3]}>
        <boxGeometry args={[4.6, 0.28, 0.95]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Highly illuminated exterior sky, sunlight, and clouds
const PassingAtmosphere = ({ pitch, roll }: { pitch: number; roll: number }) => {
  const terrainRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (terrainRef.current) {
      terrainRef.current.position.z = (t * 12) % 40;
      terrainRef.current.rotation.z = (roll * Math.PI) / 180 * 0.4;
      terrainRef.current.rotation.x = -0.12 + (pitch * Math.PI) / 180 * 0.3;
    }
  });

  return (
    <group ref={terrainRef} position={[0, -4, -22]}>
      {/* Ground illuminated terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[220, 220, 32, 32]} />
        <meshStandardMaterial 
          color="#334155" 
          wireframe 
          emissive="#3b82f6" 
          emissiveIntensity={0.5}
          roughness={0.5} 
        />
      </mesh>

      {/* Mountain silhouettes */}
      {[-35, -12, 12, 35].map((x, i) => (
        <mesh key={i} position={[x, 3.5, -15 - i * 8]}>
          <coneGeometry args={[14 + (i % 2) * 5, 11 + i * 2, 4]} />
          <meshStandardMaterial color="#1e293b" emissive="#2563eb" emissiveIntensity={0.35} roughness={0.6} />
        </mesh>
      ))}

      {/* Bright Illuminated Cloud Layers */}
      <group position={[0, 4.5, -8]}>
        <Cloud opacity={0.75} speed={0.8} bounds={[38, 6, 38]} color="#94a3b8" />
      </group>
      <group position={[-15, 6, -14]}>
        <Cloud opacity={0.65} speed={0.5} bounds={[25, 4, 25]} color="#cbd5e1" />
      </group>
    </group>
  );
};

// Cockpit Scene Root with Super High Brightness
const CockpitScene = () => {
  const { cockpitPitch, cockpitRoll } = useStore();
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (cameraGroupRef.current) {
      const t = clock.getElapsedTime();
      cameraGroupRef.current.position.x = Math.sin(t * 22) * 0.005;
      cameraGroupRef.current.position.y = Math.cos(t * 19) * 0.005;
    }
  });

  return (
    <group ref={cameraGroupRef}>
      {/* Exterior Environment */}
      <PassingAtmosphere pitch={cockpitPitch} roll={cockpitRoll} />
      
      {/* Cockpit Hardware */}
      <CockpitWindowFrame />
      
      {/* Interactive Yoke */}
      <InteractiveFlightYoke pitch={cockpitPitch} roll={cockpitRoll} />

      {/* SUPER HIGH BRIGHTNESS LIGHTING */}
      <ambientLight intensity={2.2} />
      <hemisphereLight color="#bfdbfe" groundColor="#334155" intensity={2.5} />
      <directionalLight position={[5, 15, -4]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-5, 8, 2]} intensity={1.8} color="#93c5fd" />
      
      {/* Interior Cockpit Lights */}
      <pointLight position={[0, 1.4, -0.4]} intensity={3.0} color="#fca5a5" distance={5} />
      <pointLight position={[-1, 0.2, -0.8]} intensity={2.5} color="#6ee7b7" distance={4} />
      <pointLight position={[1, 0.2, -0.8]} intensity={2.5} color="#7dd3fc" distance={4} />

      {/* Daytime/Twilight Sky Horizon */}
      <Stars radius={120} depth={50} count={1400} factor={4} saturation={0.8} fade speed={2} />
    </group>
  );
};

export const CockpitWorld: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1e3a5f] via-[#172554] to-[#0f172a]">
      <Canvas 
        camera={{ position: [0, 0, 0], fov: 65 }}
        gl={{ antialias: true, alpha: false }}
      >
        <CockpitScene />
      </Canvas>
    </div>
  );
};

export default CockpitWorld;
