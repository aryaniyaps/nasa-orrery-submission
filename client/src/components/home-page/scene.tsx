import { CameraProvider } from "@/context/camera";
import useGravity from "@/lib/hooks/use-gravity";
import { FC } from "react";
import Planets from "./planets";
import Stars from "./stars";
import Sun from "./sun";

// Import the new NEO component
import NEOs from "./neos";

interface SceneProps {
  positions: any;
  neoPositions: any; // Add neoPositions prop
}

const Scene: FC<SceneProps> = ({ positions, neoPositions }) => {
  useGravity();

  return (
    <CameraProvider>
      <Sun />
      <Planets positions={positions} />
      <NEOs positions={neoPositions} />
      <Stars />
    </CameraProvider>
  );
};

export default Scene;
