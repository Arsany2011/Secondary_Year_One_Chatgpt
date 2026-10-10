import {
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";

function StudyOrb3D() {
  return (
    <Float
      speed={1.4}
      rotationIntensity={0.45}
      floatIntensity={0.7}
    >
      <Sphere args={[1.15, 64, 64]}>
        <MeshDistortMaterial
          color="#D4A373"
          roughness={0.22}
          metalness={0.8}
          distort={0.22}
          speed={1.5}
        />
      </Sphere>
    </Float>
  );
}

export default StudyOrb3D;