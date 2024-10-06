import { useQuery } from 'react-query';
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

// Add a new hook for fetching NEO positions
function useGetNEOPositions(targetDate: string) {
  return useQuery(['neoPositions', targetDate], async () => {
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${targetDate}&end_date=${targetDate}&api_key=YOUR_API_KEY`);
    const data = await response.json();
    return data;
  });
}

export default function HomePage() {
  const [params, _setParams] = useSearchParams();
  const navigate = useNavigate();
  const queryTargetDate = params.get("targetDate");

  const targetDate = queryTargetDate
    ? new Date(queryTargetDate)
    : new Date("2024-01-01");

  // Fetch planet positions
  const { data: positions, isLoading: isLoadingPlanets, isError: isErrorPlanets } = useGetPlanetPositions({
    targetDate: targetDate.toISOString(),
  });

  // Fetch NEO positions
  const { data: neoPositions, isLoading: isLoadingNEOs, isError: isErrorNEOs } = useGetNEOPositions(targetDate.toISOString().split("T")[0]);

  if (isErrorPlanets || isErrorNEOs) {
    return <div>Error fetching positions.</div>;
  }

  if (isLoadingPlanets || isLoadingNEOs) {
    return <div>Loading...</div>;
  }

  const handleDateChange = (newDate: Date) => {
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
        <OrbitControls maxDistance={750} minDistance={5} makeDefault enableZoom enablePan />
        <Physics gravity={[0, 0, 0]}>
          <Scene positions={positions} neoPositions={neoPositions} />
        </Physics>
        <EffectComposer>
          <Bloom luminanceThreshold={500} luminanceSmoothing={500} height={300} width={300} />
        </EffectComposer>
      </Canvas>
      <ControlPanel setTargetDate={handleDateChange} targetDate={targetDate} />
    </div>
  );
}
