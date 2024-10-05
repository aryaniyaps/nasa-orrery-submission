import { CameraProvider } from "@/context/camera";
import useGravity from "@/lib/hooks/use-gravity";

import { FC } from "react";
import Planets from "./planets";
import Stars from "./stars";
import Sun from "./sun";

// Scene component
const Scene: FC = () => {
  // Custom hook for gravity logic
  useGravity();

  return (
    <CameraProvider>
      <Sun />
      <Planets />
      <Stars />
    </CameraProvider>
  );
};

export default Scene;
