import { useFrame } from "@react-three/fiber";
import { InstancedRigidBodies, RapierRigidBody } from "@react-three/rapier";
import React, { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

import { PLANETS } from "@/lib/constants";
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
}

// Define the props for Planets component
const Planets: React.FC = () => {
  const planetsRef = useRef<RapierRigidBody[]>([]);

  const planetData: PlanetData[] = useMemo(() => {
    return PLANETS.map((planet) => {
      const position = new Vector3(...planet.position);

      return {
        key: planet.key,
        position: position,
        scale: planet.scale,
        eccentricity: planet.eccentricity,
        userData: { type: "Planet", key: planet.key },
        texture: planet.texture,
        angle: planet.angle, // Initialize the angle
        rotationSpeed: planet.rotationSpeed,
      };
    });
  }, []);

  useEffect(() => {
    if (planetsRef.current) {
      planetsRef.current.forEach((planet) => {
        planet?.setAngvel(new Vector3(0, Math.random() - 0.5, 0), true);
      });
    }
  }, [planetsRef.current]);

  // Constant angular speed for all planets (adjust as needed)
  const constantAngularSpeed = 0.01; // Radians per frame

  // Update planets' positions every frame
  useFrame(() => {
    if (planetsRef.current) {
      planetsRef.current.forEach((planet, index) => {
        const data = planetData[index];
        const planetPos = planet.translation(); // Get the current physics position

        console.log(`Planet: ${data.key}, Physics Position:`, planetPos);

        // Update the angle using the constant angular speed
        data.angle += constantAngularSpeed; // Increment angle by constant speed

        // Calculate new position
        const newPosition = new Vector3(
          data.position.length() * Math.cos(data.angle),
          data.position.y,
          data.position.length() * Math.sin(data.angle)
        );

        // Update the planet's position using RigidBodyApi
        planet.setTranslation(newPosition, true);
      });
    }
  });

  return (
    <>
      <InstancedRigidBodies
        ref={planetsRef}
        instances={planetData.map((data) => ({
          position: data.position,
          scale: data.scale,
          userData: data.userData,
          key: data.key,
        }))}
        colliders="ball"
      >
        {planetData.map((data) => (
          <Planet
            key={data.key}
            position={data.position}
            scale={data.scale}
            texture={data.texture} // Pass the texture
            rotationSpeed={data.rotationSpeed}
            angle={data.angle}
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
