import { InstancedRigidBodies } from "@react-three/rapier";
import React, { useMemo } from "react";
import { Vector3 } from "three";

import { PLANETS } from "@/lib/constants"; // Ensure PLANETS includes angular speeds
import Orbit from "./orbit"; // Import the new Orbit component
import Planet from "./planet";

// Define the types for planet data
interface PlanetData {
  key: string;
  position: Vector3;
  scale: number;
  userData: { type: string; key: string };
  eccentricity: number;
  texture: string;
  angle: number; // Add angle to track the current angle in the orbit
  rotationSpeed: number;
  orbitalSpeed: number; // Add orbital speed
  radius: number; // Add xRadius
}

// Define the props for Planets component
const Planets: React.FC = () => {
  const planetData: PlanetData[] = useMemo(() => {
    return PLANETS.map((planet) => {
      const position = new Vector3(...planet.position);

      const radius = position.length(); // Calculate the radius from the Sun

      return {
        key: planet.key,
        position: position,
        scale: planet.scale,
        eccentricity: planet.eccentricity,
        userData: { type: "Planet", key: planet.key },
        texture: planet.texture,
        angle: planet.angle, // Initialize the angle
        rotationSpeed: planet.rotationSpeed,
        orbitalSpeed: 0.01, // Set a default orbital speed
        radius: radius, // Initialize xRadius
      };
    });
  }, []);

  return (
    <>
      <InstancedRigidBodies instances={planetData} colliders="ball">
        {planetData.map((data) => (
          <Planet
            key={data.key}
            position={data.position}
            scale={data.scale}
            texture={data.texture} // Pass the texture
            rotationSpeed={data.rotationSpeed}
            angle={data.angle} // Pass the angle for axial tilt
            radius={data.radius} // Example calculation, adjust as needed
          />
        ))}
      </InstancedRigidBodies>

      {/* Render orbits for each planet */}
      {planetData.map((data) => (
        <Orbit
          key={`${data.key}-orbit`}
          radius={data.position.length()} // Ensure radius matches the distance from the Sun
          segments={100} // Number of segments for the circle
          position={[0, 0, 0]} // Set the position to be at the Sun's position
          eccentricity={data.eccentricity} // Set the eccentricity for the orbit
        />
      ))}
    </>
  );
};

export default Planets;
