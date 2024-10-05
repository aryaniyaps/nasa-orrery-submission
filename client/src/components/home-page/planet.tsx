import { useCamera } from "@/context/camera";
import { useLoader } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { Color, InstancedMesh, TextureLoader } from "three";

// Define the props type
interface PlanetProps {
  count: number;
}

const Planet: React.FC<PlanetProps> = ({ count }) => {
  // Reference for instanced mesh
  const mesh = useRef<InstancedMesh>(null);

  // Access camera focus handling from context
  const { handleFocus } = useCamera();

  // Load texture for planet
  const texture = useLoader(TextureLoader, "/textures/planet.jpg");

  // Create random colors for each planet instance
  const instanceColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const hue = 250 + Math.random() * 50;
      const saturation = 40 + Math.random() * 60;
      const lightness = 60;

      const hslColor = new Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
      hslColor.toArray(colors, i * 3);
    }
    return colors;
  }, [count]);

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      onClick={handleFocus}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[2, 32, 32]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[instanceColors, 3]}
        />
      </sphereGeometry>
      <meshStandardMaterial vertexColors map={texture} />
    </instancedMesh>
  );
};

export default Planet;
