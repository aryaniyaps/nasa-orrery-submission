import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { Matrix4, Object3D, Vector3 } from "three";

// Define the types for CameraContext
interface CameraContextType {
  focusedObject: FocusedObjectType | null;
  handleFocus: (event: ThreeEvent<MouseEvent>) => void;
}

// Define the focused object type
interface FocusedObjectType {
  object: Object3D;
  instanceId?: number;
}

// Create the CameraContext with a default value of null
const CameraContext = createContext<CameraContextType | undefined>(undefined);

// Custom hook to access the CameraContext
export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};

// Define the props for CameraProvider
interface CameraProviderProps {
  children: ReactNode;
}

// CameraProvider component
export const CameraProvider: React.FC<CameraProviderProps> = ({ children }) => {
  const { camera, controls } = useThree();
  const cameraTarget = useRef(new Vector3());
  const [focusedObject, setFocusedObject] = useState<FocusedObjectType | null>(
    null
  );

  useFrame(() => {
    if (focusedObject) {
      let target: Vector3;

      if (focusedObject.instanceId !== undefined) {
        const instanceMatrix = new Matrix4();
        focusedObject.object.getMatrixAt(
          focusedObject.instanceId,
          instanceMatrix
        );
        target = new Vector3().setFromMatrixPosition(instanceMatrix);
      } else {
        target = focusedObject.object.position.clone();
      }

      const smoothness = 0.05;
      cameraTarget.current.lerp(target, smoothness);
      camera.lookAt(cameraTarget.current);

      if (controls) {
        controls.target.copy(cameraTarget.current);
        controls.update();
      }
    }
  });

  // Handle focus
  const handleFocus = (event: ThreeEvent<MouseEvent>) => {
    const object = event.object as Object3D;
    const instanceId = event.instanceId;

    if (instanceId !== undefined) {
      setFocusedObject({ object, instanceId });
    } else {
      setFocusedObject({ object });
    }
  };

  return (
    <CameraContext.Provider value={{ focusedObject, handleFocus }}>
      {children}
    </CameraContext.Provider>
  );
};
