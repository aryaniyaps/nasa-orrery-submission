import { useCamera } from "@/context/camera";
import { SUN_RADIUS } from "@/lib/constants";
import noise from "@/shaders/noise.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { ShaderMaterial } from "three";

// Define the types for the CustomShaderMaterial
interface CustomShaderMaterialProps {
  emissiveIntensity: number;
  time: number;
}

// Extend shaderMaterial for custom shader
const CustomShaderMaterial = shaderMaterial(
  { emissiveIntensity: 1.0, time: 0 } as CustomShaderMaterialProps,
  // Vertex Shader
  `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
  // Fragment Shader
  `
      uniform float time;
      uniform float emissiveIntensity;
      varying vec2 vUv;
      varying vec3 vPosition;

      ${noise}

      void main() {
          float noiseValue = noise(vPosition + time);

          vec3 color = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.2, 0.0), noiseValue);
          float intensity = (noiseValue * 0.5 + 0.5) * emissiveIntensity;

          gl_FragColor = vec4(color * intensity, 1.0);
      }
      `
);

// Sun Component
const Sun: React.FC = () => {
  const { handleFocus } = useCamera();

  // Extend the shader material so it can be used as a custom material in JSX
  extend({ CustomShaderMaterial });

  // Reference to the custom shader material
  const shaderRef = useRef<ShaderMaterial>(null);

  // Update the time uniform on each frame
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <RigidBody
      colliders="ball"
      userData={{ type: "Sun" }}
      type="kinematicPosition"
      onClick={handleFocus}
    >
      <mesh>
        <sphereGeometry args={[SUN_RADIUS, 32, 32]} />
        <customShaderMaterial ref={shaderRef} emissiveIntensity={5} time={0} />
      </mesh>

      <pointLight
        position={[0, 0, 0]}
        intensity={50000}
        color={"rgb(255, 207, 55)"}
      />
    </RigidBody>
  );
};

export default Sun;
