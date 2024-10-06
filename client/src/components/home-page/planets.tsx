import { PLANETS, POSITION_SCALING_FACTOR } from "@/lib/constants";
import { InstancedRigidBodies } from "@react-three/rapier";
import React, { useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import Orbit from "./orbit";
import Planet from "./planet";

interface PlanetData {
  key: string;
  position: Vector3;
  scale: number;
  userData: { type: string; key: string };
  eccentricity: number;
  texture: string;
  angle: number; // Axial tilt in degrees
  rotationSpeed: number;
  revolutionSpeed: number;
  radius: number;
  tilt: number;
  semiMajorAxis: number;
}

interface PlanetsProps {
  positions: any;
}

const Planets: React.FC<PlanetsProps> = ({ positions }) => {
  const [focusedPlanet, setFocusedPlanet] = useState<PlanetData | null>(null);
  const [isCameraLockActive, setIsCameraLockActive] = useState(true);

  // Position of the sun or focal point
  const sunPosition = new Vector3(0, 0, 0); // Set this to the position of your sun

  useEffect(() => {
    const deactivateCameraLock = () => {
      setIsCameraLockActive(false);
    };

    window.addEventListener("mousemove", deactivateCameraLock);

    return () => {
      window.removeEventListener("mousemove", deactivateCameraLock);
    };
  }, []);

  const planetData: PlanetData[] = useMemo(() => {
    return PLANETS.map((planet) => {
      const currentPosition = positions[planet.key];
      const position = new Vector3(
        ...[
          currentPosition[0] * POSITION_SCALING_FACTOR,
          currentPosition[1] * POSITION_SCALING_FACTOR,
          currentPosition[2] * POSITION_SCALING_FACTOR,
        ]
      );

      // Convert angle from degrees to radians for rotation
      const tiltInRadians = (planet.angle * Math.PI) / 180;
      const inclinationInRadians = (planet.orbitTilt * Math.PI) / 180; // Convert inclination to radians

      // Apply the axial tilt and inclination to the position
      const tiltedPosition = new Vector3(
        position.x,
        position.y * Math.cos(tiltInRadians) -
          position.z * Math.sin(tiltInRadians), // Y-axis rotation
        position.y * Math.sin(tiltInRadians) +
          position.z * Math.cos(tiltInRadians) // Z-axis rotation
      );

      // Apply inclination to the Y-axis
      const inclinedPosition = new Vector3(
        tiltedPosition.x,
        tiltedPosition.y * Math.cos(inclinationInRadians) -
          tiltedPosition.z * Math.sin(inclinationInRadians),
        tiltedPosition.y * Math.sin(inclinationInRadians) +
          tiltedPosition.z * Math.cos(inclinationInRadians)
      );

      const radius = inclinedPosition.length();

      return {
        key: planet.key,
        position: inclinedPosition,
        scale: planet.scale,
        eccentricity: planet.eccentricity,
        userData: { type: "Planet", key: planet.key },
        texture: planet.texture,
        angle: planet.angle,
        rotationSpeed: planet.rotationSpeed,
        revolutionSpeed: planet.revolutionSpeed,
        radius: radius,
        tilt: planet.orbitTilt,
        semiMajorAxis: planet.semiMajorAxis,
      };
    });
  }, [positions]);

  const handlePlanetClick = (data: PlanetData) => {
    setFocusedPlanet(data);
    setIsCameraLockActive(true);
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
            onPlanetClick={() => handlePlanetClick(data)}
            isFocused={focusedPlanet?.key === data.key && isCameraLockActive}
          />
        ))}
      </InstancedRigidBodies>

      {planetData.map((data) => (
        <Orbit
          key={`${data.key}-orbit`}
          radius={data.semiMajorAxis * POSITION_SCALING_FACTOR} // Semi-major axis adjusted for scaling
          segments={100}
          focusPosition={sunPosition} // Center orbit around the sun position
          eccentricity={data.eccentricity}
          tilt={data.tilt} // Pass the angle for tilt
        />
      ))}
    </>
  );
};

export default Planets;
