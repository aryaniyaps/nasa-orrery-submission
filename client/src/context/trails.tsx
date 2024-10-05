import { Line } from "@react-three/drei";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Vector3 } from "three";

// Define the types for the context
interface TrailContextType {
  addTrailPoint: (key: string, position: Vector3) => void;
  clearTrail: (key: string) => void;
}

// Define the props for the TrailProvider
interface TrailProviderProps {
  children: ReactNode;
}

// Create the TrailContext with default undefined value
const TrailContext = createContext<TrailContextType | undefined>(undefined);

// Custom hook to use the TrailContext
export const useTrails = () => {
  const context = useContext(TrailContext);
  if (!context) {
    throw new Error("useTrails must be used within a TrailProvider");
  }
  return context;
};

// TrailProvider component
export const TrailProvider: React.FC<TrailProviderProps> = ({ children }) => {
  const [trails, setTrails] = useState<Record<string, Vector3[]>>({});

  // Function to add a point to the trail
  const addTrailPoint = useCallback((key: string, position: Vector3) => {
    setTrails((prevTrails) => {
      const trail = prevTrails[key] || [];
      const newTrail = trail.length >= 300 ? trail.slice(1) : trail;
      const lastPoint = newTrail[newTrail.length - 1];
      if (!lastPoint || lastPoint.distanceToSquared(position) > 1) {
        return { ...prevTrails, [key]: [...newTrail, position.clone()] };
      }
      return prevTrails;
    });
  }, []);

  // Function to clear a specific trail
  const clearTrail = useCallback((key: string) => {
    setTrails((prevTrails) => {
      const { [key]: _, ...rest } = prevTrails; // Destructuring to omit the key
      return rest;
    });
  }, []);

  return (
    <TrailContext.Provider value={{ addTrailPoint, clearTrail }}>
      {children}
      {Object.entries(trails).map(([key, positions]) => (
        <Line key={key} points={positions} color="rgba(30,30,30)" />
      ))}
    </TrailContext.Provider>
  );
};
