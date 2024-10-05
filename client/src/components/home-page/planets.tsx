import { useFrame } from "@react-three/fiber";
import {
  InstancedRigidBodies,
  RigidBodyApi,
  RigidBodyProps,
} from "@react-three/rapier";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

import { useExplosion } from "@/context/explosions";
import { useTrails } from "@/context/trails";
import {
  calculateInitialPosition,
  calculateInitialVelocity,
} from "@/utils/planetCalculations";

import Planet from "./planet";

// Define the types for planet data
interface PlanetData {
  key: string;
  position: Vector3;
  linearVelocity: Vector3;
  scale: number;
  userData: { type: string; key: string };
}

// Define the props for Planets component
interface PlanetsProps {
  count?: number;
}

// Planets component
const Planets: React.FC<PlanetsProps> = ({ count = 14 }) => {
  const { triggerExplosion } = useExplosion();
  const { addTrailPoint, clearTrail } = useTrails();

  // Define the ref for instanced rigid bodies
  const planetsRef = useRef<RigidBodyApi[]>([]);

  const [planetCount, setPlanetCount] = useState<number>(count);

  // Create a new planet with randomized values
  const newPlanet = (respawn = false): PlanetData => {
    const key = "instance_" + Math.random();
    const position = calculateInitialPosition(respawn);
    const linearVelocity = calculateInitialVelocity(position, respawn);
    const scale = 0.5 + Math.random() * 1.5;

    return {
      key,
      position,
      linearVelocity,
      scale,
      userData: { type: "Planet", key },
    };
  };

  // Memoize the initial planet data to avoid re-computing on every render
  const planetData: PlanetData[] = useMemo(() => {
    const planets: PlanetData[] = [];
    for (let i = 0; i < count; i++) {
      planets.push(newPlanet());
    }
    return planets;
  }, [count]);

  // Update planet count and add initial spin to planets
  useEffect(() => {
    if (planetsRef.current) {
      setPlanetCount(planetsRef.current.length);
      planetsRef.current.forEach((planet) => {
        planet?.setAngvel(new Vector3(0, Math.random() - 0.5, 0));
      });
    }
  }, [planetsRef.current]);

  // Add a trail point for each planet on each frame
  useFrame(() => {
    planetsRef.current?.forEach((planet) => {
      const position = planet.translation();
      addTrailPoint(
        planet.userData.key,
        new Vector3(position.x, position.y, position.z)
      );
    });
  });

  // Handle collision logic
  const handleCollision = ({ manifold, target, other }: any) => {
    console.log("Planet collision");

    const targetMass = target.rigidBody.mass();
    const otherMass = other.rigidBody.mass();

    if (otherMass > targetMass) {
      const targetPosition = target.rigidBody.translation();
      const collisionWorldPosition = manifold.solverContactPoint(0);

      const targetVelocity = target.rigidBody.linvel();
      const otherVelocity = other.rigidBody.linvel();

      const combinedMass = targetMass + otherMass;
      const combinedVelocity = new Vector3()
        .addScaledVector(targetVelocity, targetMass)
        .addScaledVector(otherVelocity, otherMass)
        .divideScalar(combinedMass);

      if (other.rigidBody.userData.type === "Planet") {
        other.rigidBody.setLinvel(combinedVelocity);
      }

      clearTrail(target.rigidBody.userData.key);

      triggerExplosion(
        new Vector3(
          collisionWorldPosition.x,
          collisionWorldPosition.y,
          collisionWorldPosition.z
        ),
        new Vector3(targetPosition.x, targetPosition.y, targetPosition.z)
      );

      const newPlanetData = newPlanet(true);

      target.rigidBody.userData.key = newPlanetData.key;
      target.rigidBody.setTranslation(newPlanetData.position);
      target.rigidBody.setLinvel(newPlanetData.linearVelocity);
    }
  };

  return (
    <InstancedRigidBodies
      ref={planetsRef}
      instances={planetData as RigidBodyProps[]}
      colliders="ball"
      onCollisionEnter={handleCollision}
    >
      <Planet count={planetCount} />
    </InstancedRigidBodies>
  );
};

export default Planets;
