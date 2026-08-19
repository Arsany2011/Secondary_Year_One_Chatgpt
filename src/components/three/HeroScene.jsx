import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
  Torus,
} from "@react-three/drei";

import { useRef } from "react";
import * as THREE from "three";

function MainOrb() {
  const orbRef = useRef();

  useFrame((state) => {
    if (!orbRef.current) return;

    orbRef.current.rotation.y =
      state.clock.elapsedTime * 0.18;

    orbRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.25}
      floatIntensity={0.5}
    >
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.25, 64, 64]} />

        <meshPhysicalMaterial
          color="#023020"
          metalness={0.72}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#012419"
          emissiveIntensity={0.45}
        />
      </mesh>
    </Float>
  );
}

function GoldRing({
  rotation,
  scale = 1,
  speed = 0.15,
}) {
  const ringRef = useRef();

  useFrame(() => {
    if (!ringRef.current) return;

    ringRef.current.rotation.z += speed * 0.01;
    ringRef.current.rotation.x += speed * 0.004;
  });

  return (
    <Torus
      ref={ringRef}
      args={[1.65, 0.012, 16, 100]}
      rotation={rotation}
      scale={scale}
    >
      <meshStandardMaterial
        color="#D4A373"
        emissive="#D4A373"
        emissiveIntensity={1.6}
        metalness={0.9}
        roughness={0.22}
      />
    </Torus>
  );
}

function OrbScene() {
  return (
    <>
      <ambientLight intensity={0.45} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={2}
        color="#D4A373"
      />

      <pointLight
        position={[-3, -1, 2]}
        intensity={8}
        distance={7}
        color="#D4A373"
      />

      <pointLight
        position={[3, 2, -3]}
        intensity={4}
        distance={6}
        color="#023020"
      />

      <MainOrb />

      <GoldRing
        rotation={[Math.PI / 2.4, 0.2, 0]}
        scale={1}
        speed={0.9}
      />

      <GoldRing
        rotation={[0.4, Math.PI / 2.5, 0]}
        scale={0.82}
        speed={-0.7}
      />

      <GoldRing
        rotation={[1.1, 0.2, 0.8]}
        scale={1.15}
        speed={0.5}
      />

      <Sparkles
        count={45}
        scale={[5, 5, 5]}
        size={1.4}
        speed={0.18}
        opacity={0.55}
        color="#D4A373"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.04}
        rotateSpeed={0.35}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

function HeroScene() {
  return (
    <div className="hero-3d-scene">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 5],
          fov: 42,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <OrbScene />
      </Canvas>
    </div>
  );
}

export default HeroScene;