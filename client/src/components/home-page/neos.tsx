import { MeshProps } from "@react-three/fiber";
import { FC } from "react";
import { Mesh } from "three";

interface NEOsProps extends MeshProps {
  positions: any; // Adjust this type as per your API response structure
}

const NEOs: FC<NEOsProps> = ({ positions }) => {
  return (
    <>
      {positions?.near_earth_objects?.map((neo: any, index: number) => {
        const { estimated_diameter, close_approach_data } = neo;
        const diameter = estimated_diameter?.kilometers?.estimated_diameter_max || 1;
        const distance = close_approach_data[0]?.miss_distance?.kilometers || 1000;

        return (
          <mesh
            key={index}
            position={[Math.random() * distance, Math.random() * distance, Math.random() * distance]}
            scale={diameter * 0.1}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}
    </>
  );
};

export default NEOs;
