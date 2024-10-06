import ControlPanel from "@/components/home-page/controls/control-panel";
import Scene from "@/components/home-page/scene";
import useGetPlanetPositions from "@/lib/queries/useGetPlanetPositions";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { startTransition } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function HomePage() {
  const [params, _setParams] = useSearchParams();
  const navigate = useNavigate();
  const queryTargetDate = params.get("targetDate");

  // Convert query parameter to Date or default to a specific date
  const targetDate = queryTargetDate
    ? new Date(queryTargetDate)
    : new Date("2024-01-01");

  console.log(targetDate);

  // Call the custom hook with the target date
  const {
    data: positions,
    isLoading,
    isError,
  } = useGetPlanetPositions({
    targetDate: targetDate.toISOString(),
  });

  // Error handling
  if (isError) {
    return <div>Error fetching positions.</div>;
  }

  // Loading state handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDateChange = (newDate: Date) => {
    // Update the query parameter in the URL
    startTransition(() => {
      navigate({
        pathname: "/",
        search: `?${createSearchParams({ targetDate: newDate.toISOString() })}`,
      });
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
        <color attach="background" args={["black"]} />
        <ambientLight intensity={1.5} />

        <OrbitControls
          maxDistance={750}
          minDistance={5}
          makeDefault
          enableZoom
          enablePan
        />

        <Physics gravity={[0, 0, 0]}>
          <Scene positions={positions} />{" "}
          {/* Pass positions to Scene if needed */}
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
      <ControlPanel setTargetDate={handleDateChange} targetDate={targetDate} />
    </div>
  );
}
