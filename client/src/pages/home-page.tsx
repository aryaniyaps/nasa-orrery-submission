import Scene from "@/components/home-page/scene";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
export default function HomePage() {
  return (
    <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.25} />

      <OrbitControls maxDistance={500} minDistance={5} makeDefault enableZoom />

      <Physics gravity={[0, 0, 0]}>
        <Scene />
      </Physics>

      <EffectComposer>
        <Bloom
          luminanceThreshold={500}
          luminanceSmoothing={500}
          height={300}
          width={300}
        />
      </EffectComposer>
    </Canvas>
  );
}
