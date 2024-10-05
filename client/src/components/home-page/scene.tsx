import { CameraProvider } from "@/context/camera";
import { ExplosionProvider } from "@/context/explosions";
import { TrailProvider } from "@/context/trails";
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
      <ExplosionProvider>
        <Sun />

        <TrailProvider>
          <Planets />
        </TrailProvider>

        <Stars />
      </ExplosionProvider>
    </CameraProvider>
  );
};

export default Scene;
