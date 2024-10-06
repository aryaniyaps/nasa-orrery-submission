import { CameraProvider } from "@/context/camera";
import useGravity from "@/lib/hooks/use-gravity";

import { FC } from "react";
import Planets from "./planets";
import Stars from "./stars";
import Sun from "./sun";

interface SceneProps {
  positions: any;
}
// Scene component
const Scene: FC<SceneProps> = (props) => {
  // Custom hook for gravity logic
  useGravity();

  return (
    <CameraProvider>
      <Sun />
      <Planets positions={props.positions} />
      <Stars />
    </CameraProvider>
  );
};

export default Scene;
