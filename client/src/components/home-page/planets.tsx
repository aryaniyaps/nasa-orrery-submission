import { PLANETS, POSITION_SCALING_FACTOR } from "@/lib/constants";
import { InstancedRigidBodies } from "@react-three/rapier";
import React, { useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import Orbit from "./orbit";
import Planet from "./planet";

// Define the types for planet data
interface PlanetData {
  key: string;
  position: Vector3;
  scale: number;
  userData: { type: string; key: string };
  eccentricity: number;
  texture: string;
  angle: number;
  rotationSpeed: number;
  revolutionSpeed: number;
  orbitalSpeed: number;
  radius: number;
}

interface PlanetsProps {
  positions: any;
}
const Planets: React.FC<PlanetsProps> = ({ positions }) => {
  const [focusedPlanet, setFocusedPlanet] = useState<PlanetData | null>(null); // Track the focused planet
  const [isCameraLockActive, setIsCameraLockActive] = useState(true); // Track if camera locking is active

  // Handle scroll detection
  useEffect(() => {
    const deactivateCameraLock = () => {
      setIsCameraLockActive(false); // Disable camera lock on scroll
    };

    window.addEventListener("mousemove", deactivateCameraLock);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("mousemove", deactivateCameraLock);
    };
  }, []);

  const planetData: PlanetData[] = useMemo(() => {
    return PLANETS.map((planet) => {
      // const currentPosition = planet.position; // Get the current position from the positions prop
      const currentPosition = positions[planet.key]; // Get the current position from the positions prop
      const position = new Vector3(
        ...[
          currentPosition[0] * POSITION_SCALING_FACTOR,
          currentPosition[1] * POSITION_SCALING_FACTOR,
          currentPosition[2] * POSITION_SCALING_FACTOR,
        ]
      ); // Create a Vector3 with the position
      const radius = position.length(); // Calculate the radius from the Sun

      return {
        key: planet.key,
        position: position,
        scale: planet.scale,
        eccentricity: planet.eccentricity,
        userData: { type: "Planet", key: planet.key },
        texture: planet.texture,
        angle: planet.angle,
        rotationSpeed: planet.rotationSpeed,
        revolutionSpeed: planet.revolutionSpeed,
        orbitalSpeed: 0.01, // Set a default orbital speed
        radius: radius,
      };
    });
  }, []);

  const handlePlanetClick = (data: PlanetData) => {
    setFocusedPlanet(data); // Set the clicked planet as focused
    setIsCameraLockActive(true); // Re-enable camera lock when a planet is clicked
  };

  return (
    <>
      <InstancedRigidBodies instances={planetData} colliders="ball">
        {planetData.map((data) => (
          <Planet
            key={data.key}
            planetName={data.key}
            position={data.position}
            scale={data.scale}
            texture={data.texture}
            rotationSpeed={data.rotationSpeed}
            angle={data.angle}
            radius={data.radius}
            revolutionSpeed={data.revolutionSpeed}
            onPlanetClick={() => handlePlanetClick(data)} // Handle planet click
            isFocused={focusedPlanet?.key === data.key && isCameraLockActive} // Check if this is the focused planet and camera locking is active
          />
        ))}
      </InstancedRigidBodies>

      {/* Render orbits for each planet */}
      {planetData.map((data) => (
        <Orbit
          key={`${data.key}-orbit`}
          radius={data.radius}
          segments={100}
          position={[0, 0, 0]}
          eccentricity={data.eccentricity}
        />
      ))}
    </>
  );
};

export default Planets;
