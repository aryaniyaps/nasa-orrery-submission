import { Line } from "@react-three/drei";
import React from "react";
import { Vector3 } from "three";

// Define props for the Orbit component
interface OrbitProps {
  radius: number;
  segments: number;
  position: number[];
  eccentricity: number; // New prop for eccentricity
}

// Orbit component for rendering elliptical paths
const Orbit: React.FC<OrbitProps> = ({
  radius,
  segments,
  position,
  eccentricity,
}) => {
  const points: Vector3[] = [];

  const semiMajorAxis = radius; // Semi-major axis based on the radius
  const semiMinorAxis = radius * Math.sqrt(1 - eccentricity ** 2); // Semi-minor axis

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2; // Full circle angle
    const x = semiMajorAxis * Math.cos(angle); // Elliptical x-coordinate
    const z = semiMinorAxis * Math.sin(angle); // Elliptical z-coordinate
    points.push(new Vector3(x, 0, z).add(new Vector3(...position))); // Add center position
  }

  return (
    <Line
      points={points}
      lineWidth={0.25}
      color="white"
      transparent
      opacity={0.5}
    />
  );
};

export default Orbit;
