import { SECONDS_IN_A_YEAR } from "@/lib/constants";
import { Vector3 } from "three";

// Function to calculate linear velocity
export default function calculateLinearVelocity({
  radius,
  orbitalPeriod,
}: {
  orbitalPeriod: number;
  radius: number;
}) {
  const T = orbitalPeriod * SECONDS_IN_A_YEAR; // Convert orbital period to seconds
  const velocityMagnitude = (2 * Math.PI * radius) / T; // Calculate linear velocity magnitude

  // For a circular orbit, we can assume the initial velocity direction is along the positive Z-axis
  // The velocity vector is perpendicular to the radius vector
  // Assume counter-clockwise rotation
  const direction = new Vector3(0, 0, 1); // Change this to any direction you prefer
  const velocityVector = direction.clone().multiplyScalar(velocityMagnitude); // Scale by the velocity magnitude

  return [velocityVector.x, velocityVector.y, velocityVector.z]; // Return as an array
}
