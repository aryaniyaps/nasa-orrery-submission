import Explosion from "@/components/home-page/explosion";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Vector3 } from "three";

// Define the type for an explosion
interface ExplosionType {
  position: Vector3;
  lookAt: Vector3;
  id: number;
}

// Define the types for the context
interface ExplosionContextType {
  triggerExplosion: (position: Vector3, lookAt: Vector3) => void;
}

// Create the ExplosionContext with a default undefined value
const ExplosionContext = createContext<ExplosionContextType | undefined>(
  undefined
);

// Custom hook to use the ExplosionContext
export const useExplosion = () => {
  const context = useContext(ExplosionContext);
  if (!context) {
    throw new Error("useExplosion must be used within an ExplosionProvider");
  }
  return context;
};

// Define the props for the ExplosionProvider
interface ExplosionProviderProps {
  children: ReactNode;
}

// ExplosionProvider component
export const ExplosionProvider: React.FC<ExplosionProviderProps> = ({
  children,
}) => {
  const [explosions, setExplosions] = useState<ExplosionType[]>([]);

  // Function to trigger a new explosion
  const triggerExplosion = (position: Vector3, lookAt: Vector3) => {
    setExplosions((prev) => [...prev, { position, lookAt, id: Math.random() }]);
  };

  // Function to handle when an explosion animation is complete
  const handleExplosionComplete = (id: number) => {
    setExplosions((prev) => prev.filter((explosion) => explosion.id !== id));
  };

  return (
    <ExplosionContext.Provider value={{ triggerExplosion }}>
      {children}
      {explosions.map(({ id, position, lookAt }) => (
        <Explosion
          key={id}
          position={position}
          lookAt={lookAt}
          onComplete={() => handleExplosionComplete(id)}
        />
      ))}
    </ExplosionContext.Provider>
  );
};
