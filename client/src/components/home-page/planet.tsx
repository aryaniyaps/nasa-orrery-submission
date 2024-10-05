import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh, TextureLoader } from "three";

// Define the props type for the Planet component
interface PlanetProps extends MeshProps {
  scale: number;
  texture: string; // New prop for texture URL or path
  rotationSpeed: number; // New prop for rotation speed
  angle: number;
}

const Planet: React.FC<PlanetProps> = ({
  scale,
  texture,
  rotationSpeed,
  angle,
  ...props
}) => {
  const planetTexture = useLoader(TextureLoader, texture);
  const meshRef = useRef<Mesh>(null); // Create a ref for the mesh

  // Rotate the planet on every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.0005; // Adjust the rotation speed here
    }
  });
  // Convert angle from degrees to radians
  const radians = (angle * Math.PI) / 180;
  return (
    <mesh ref={meshRef} {...props} scale={scale} rotation={[radians, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={planetTexture}
        roughness={100} // Increase roughness for less reflection
        metalness={0.1} // Lower metalness for less shiny effect
      />
    </mesh>
  );
};

export default Planet;
