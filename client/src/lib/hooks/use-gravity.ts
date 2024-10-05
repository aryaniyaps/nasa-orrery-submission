import { GRAVITATIONAL_CONSTANT, SCALE_FACTOR } from "@/lib/constants";
import { useBeforePhysicsStep, useRapier } from "@react-three/rapier";
import { Vector3 } from "three";

// Type definitions for the Rapier body, which may be enhanced by the @react-three/rapier package
interface RigidBody {
  isSleeping: () => boolean;
  mass: () => number;
  translation: () => { x: number; y: number; z: number };
  applyImpulse: (impulse: Vector3, wakeUp: boolean) => void;
}

// Type definition for the world object, which contains bodies
interface World {
  bodies: RigidBody[];
}

const useGravity = () => {
  const { world } = useRapier() as { world: World };

  useBeforePhysicsStep(() => {
    if (!world) return;

    const impulseVector = new Vector3();

    world.bodies.forEach((currentBody) => {
      if (currentBody.isSleeping()) return;

      const currentMass = currentBody.mass();
      const currentPosition = currentBody.translation();
      const currentPositionVector = new Vector3(
        currentPosition.x,
        currentPosition.y,
        currentPosition.z
      );

      world.bodies.forEach((otherBody) => {
        if (currentBody === otherBody || otherBody.isSleeping()) return;

        const otherMass = otherBody.mass();
        const otherPosition = otherBody.translation();
        const otherPositionVector = new Vector3(
          otherPosition.x,
          otherPosition.y,
          otherPosition.z
        );

        const distance = currentPositionVector.distanceTo(otherPositionVector);

        if (distance === 0) return;

        const force =
          (GRAVITATIONAL_CONSTANT * currentMass * otherMass) /
          Math.pow(distance * SCALE_FACTOR, 2);
        impulseVector
          .subVectors(otherPositionVector, currentPositionVector)
          .normalize()
          .multiplyScalar(force);
        currentBody.applyImpulse(impulseVector, true);
      });
    });
  });
};

export default useGravity;
