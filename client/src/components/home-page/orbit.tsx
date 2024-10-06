import { Line } from "@react-three/drei";
import React from "react";
import { Vector3 } from "three";

// Define props for the Orbit component
interface OrbitProps {
  radius: number; // Semi-major axis (in astronomical units)
  segments: number; // Number of segments for drawing the orbit
  focusPosition: Vector3; // Center position for the orbit (e.g., the sun)
  eccentricity: number; // Eccentricity of the orbit (0 = circle, 1 = parabola)
  tilt: number; // Tilt angle in degrees (0 = aligned with X-Z plane)
}

// Orbit component for rendering elliptical paths
const Orbit: React.FC<OrbitProps> = ({
  radius,
  segments,
  focusPosition,
  eccentricity,
  tilt,
}) => {
  const points: Vector3[] = [];

  // Semi-major and semi-minor axes calculation
  const semiMajorAxis = radius; // Semi-major axis based on the radius
  const semiMinorAxis = radius * Math.sqrt(1 - eccentricity ** 2); // Semi-minor axis

  // Convert tilt angle from degrees to radians
  const tiltInRadians = (tilt * Math.PI) / 180;

  // Generate orbit points
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2; // Full circle angle

    // Calculate the elliptical coordinates
    const x = semiMajorAxis * Math.cos(angle);
    const z = semiMinorAxis * Math.sin(angle);

    // Apply tilt transformations
    const tiltedZ = z * Math.cos(tiltInRadians) - x * Math.sin(tiltInRadians);
    const y = x * Math.sin(tiltInRadians) + z * Math.cos(tiltInRadians);

    // Create the point and add the focus position (e.g., Sun)
    const orbitPoint = new Vector3(x, y, tiltedZ).add(focusPosition);
    points.push(orbitPoint);
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
