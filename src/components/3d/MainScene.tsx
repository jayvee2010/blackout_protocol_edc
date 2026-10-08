import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Plane, Box, Points, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import gsap from 'gsap';

// A cooler Stealth Jet model
const StealthJet = React.forwardRef<THREE.Group, any>((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Main Body - flattened cone looks like a stealth bomber */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.3, 0.8, 3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Cockpit canopy */}
      <mesh position={[0, 0.05, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.3, 3]} />
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Engine glows */}
      <mesh position={[-0.1, 0, -0.4]}>
        <boxGeometry args={[0.05, 0.02, 0.05]} />
        <meshBasicMaterial color="#ff2200" />
      </mesh>
      <mesh position={[0.1, 0, -0.4]}>
        <boxGeometry args={[0.05, 0.02, 0.05]} />
        <meshBasicMaterial color="#ff2200" />
      </mesh>
    </group>
  );
});

const DottedGlobe = () => {
  const points = useMemo(() => {
    const pts = [];
    const numPoints = 2500;
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      pts.push(
        2.01 * Math.cos(theta) * Math.sin(phi),
        2.01 * Math.sin(theta) * Math.sin(phi),
        2.01 * Math.cos(phi)
      );
    }
    return new Float32Array(pts);
  }, []);

  return (
    <Points positions={points}>
      <pointsMaterial transparent color="#ffffff" size={0.015} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
};

// Orbital rings around the globe
const OrbitalRings = () => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ring1.current) ring1.current.rotation.x = clock.getElapsedTime() * 0.2;
    if (ring2.current) {
      ring2.current.rotation.y = clock.getElapsedTime() * 0.15;
      ring2.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[2.4, 2.41, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI/4, 0]}>
        <ringGeometry args={[2.8, 2.81, 64]} />
        <meshBasicMaterial color="#7CFF5B" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

// Debris pieces for crash site
const Debris = () => {
  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 8, 
            0.05, 
            (Math.random() - 0.5) * 8
          ]}
          rotation={[
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            Math.random() * Math.PI
          ]}
        >
          <boxGeometry args={[Math.random() * 0.4 + 0.1, 0.05, Math.random() * 0.5 + 0.1]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.8} />
        </mesh>
      ))}
    </>
  );
};

const GlobeGroup = ({ gameState }: { gameState: string }) => {
  const globeRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Group>(null);
  const explosionRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    if (gameState === 'CRASH_SEQUENCE') {
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 3.8,
        duration: 3.5,
        ease: 'power3.inOut'
      });
      
      setTimeout(() => {
        if (planeRef.current) {
          planeRef.current.position.set(2.5, 1.5, 3);
          planeRef.current.lookAt(-0.5, 0.2, 1.9);
          
          gsap.to(planeRef.current.position, {
            x: -0.5,
            y: 0.2,
            z: 1.9,
            duration: 2.5,
            ease: 'power2.in',
            onComplete: () => {
               setExploded(true);
               if (explosionRef.current) {
                 explosionRef.current.intensity = 80;
                 gsap.to(explosionRef.current, { intensity: 0, duration: 2, ease: 'power2.out' });
               }
               gsap.to(camera.position, {
                 x: "+=0.1", y: "-=0.1", duration: 0.05, yoyo: true, repeat: 15
               });
            }
          });
        }
      }, 50);
    } else if (gameState === 'MISSION_START') {
      gsap.to(camera.position, {
        x: 0,
        y: 3,
        z: 5,
        duration: 2,
        ease: 'power2.out'
      });
      gsap.to(camera.rotation, {
        x: -Math.PI / 4.5,
        duration: 2,
        ease: 'power2.out'
      });
    }
  }, [gameState, camera]);

  useFrame(({ clock, mouse }) => {
    if (globeRef.current && (gameState === 'BOOT' || gameState === 'AUTHENTICATION')) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, mouse.y * 0.1, 0.05);
      globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group>
      {(gameState === 'BOOT' || gameState === 'AUTHENTICATION' || gameState === 'CRASH_SEQUENCE') && (
        <group ref={globeRef}>
          <DottedGlobe />
          <OrbitalRings />
          <Sphere args={[2, 32, 32]}>
            <meshBasicMaterial color="#020202" />
          </Sphere>
          
          <pointLight ref={explosionRef} color="#ff3300" intensity={0} distance={15} position={[-0.5, 0.2, 2.1]} />
        </group>
      )}

      {!exploded && gameState === 'CRASH_SEQUENCE' && (
        <StealthJet ref={planeRef} />
      )}

      {(gameState === 'MISSION_START' || gameState === 'MISSION_EXPIRED' || gameState === 'DISQUALIFIED') && (
        <group position={[0, -1, 0]}>
          {/* Main rugged ground */}
          <Plane args={[100, 100, 20, 20]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#070A08" wireframe transparent opacity={0.3} />
          </Plane>
          {/* Ground core */}
          <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <meshStandardMaterial color="#020302" />
          </Plane>
          
          <Debris />

          {/* Black box beacon */}
          <group position={[0, 0, 0]}>
            <Box args={[0.2, 0.2, 0.2]} position={[0, 0.1, 0]}>
              <meshStandardMaterial color="#111" emissive="#7CFF5B" emissiveIntensity={2} />
              <pointLight color="#7CFF5B" intensity={5} distance={8} />
            </Box>
            {/* Holographic rings over beacon */}
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
              <ringGeometry args={[0.4, 0.45, 32]} />
              <meshBasicMaterial color="#7CFF5B" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
              <ringGeometry args={[0.6, 0.62, 32]} />
              <meshBasicMaterial color="#7CFF5B" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

const MainScene: React.FC = () => {
  const gameState = useStore((state) => state.gameState);

  return (
    <div className="absolute inset-0 z-0 bg-[#010201]">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <GlobeGroup gameState={gameState} />
      </Canvas>
    </div>
  );
};

export default MainScene;
