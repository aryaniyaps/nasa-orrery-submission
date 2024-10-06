import { MeshProps, useLoader, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh, TextureLoader } from "three";

// Define the props type for the Planet component
interface PlanetProps extends MeshProps {
  scale: number;
  texture: string;
  rotationSpeed: number;
  revolutionSpeed: number;
  angle: number;
  radius: number;
  onPlanetClick: () => void; // Callback for when the planet is clicked
  isFocused: boolean; // Whether the camera is locked onto this planet
  planetName: string; // The name of the planet to display when focused
}

const Planet: React.FC<PlanetProps> = ({
  scale,
  texture,
  rotationSpeed,
  revolutionSpeed,
  angle,
  radius,
  onPlanetClick,
  isFocused,
  planetName, // Planet name prop
  ...props
}) => {
  const planetTexture = useLoader(TextureLoader, texture);
  const meshRef = useRef<Mesh>(null);
  const { camera } = useThree();

  // Rotate the planet on every frame
  // useFrame(({ clock }) => {
  //   if (meshRef.current) {
  //     // Planet rotation
  //     meshRef.current.rotation.y += rotationSpeed / TIME_SCALE;

  //     // Planet revolution
  //     const t = clock.getElapsedTime() / TIME_SCALE;
  //     const x = radius * Math.sin(t * revolutionSpeed);
  //     const z = radius * Math.cos(t * revolutionSpeed);
  //     meshRef.current.position.set(x, 0, z);

  //     // If the planet is focused and camera locking is active, update the camera position
  //     if (isFocused) {
  //       const offset = new Vector3(10, 5, 10); // Offset the camera to give a better view
  //       camera.position.copy(meshRef.current.position.clone().add(offset));
  //       camera.lookAt(meshRef.current.position);
  //     }
  //   }
  // });

  // Convert angle from degrees to radians
  const radians = (angle * Math.PI) / 180;

  return (
    <>
      <mesh
        ref={meshRef}
        {...props}
        scale={scale}
        rotation={[radians, 0, 0]}
        onClick={onPlanetClick} // Detect click and lock onto planet
        castShadow
      >
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          map={planetTexture}
          roughness={100}
          metalness={0.1}
        />
      </mesh>
    </>
  );
};

export default Planet;
