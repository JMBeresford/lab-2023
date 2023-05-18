import { useTexture } from "@react-three/drei";
import albedoImg from "experiment-assets/s-rank-jutsu/floor/albedo.jpeg";
import normalImg from "experiment-assets/s-rank-jutsu/floor/normal.jpeg";
// import roughnessImg from "experiment-assets/s-rank-jutsu/floor/roughness.jpeg";
import aoImg from "experiment-assets/s-rank-jutsu/floor/ao.jpeg";
import { RepeatWrapping, Texture } from "three";

const Floor = () => {
  const [albedo, normal, ao] = useTexture([albedoImg, normalImg, aoImg], (textures) => {
    if (textures instanceof Texture) return;
    textures.forEach((tex) => {
      tex.wrapS = RepeatWrapping;
      tex.wrapT = RepeatWrapping;
      tex.repeat.set(6, 6);
      tex.needsUpdate = true;
    });
  });

  return (
    <mesh rotation={[-Math.PI / 2.0, 0, 0]} position={[0, -1.5, 0]} renderOrder={1}>
      <planeGeometry args={[50, 50]} />
      <meshToonMaterial transparent={true} map={albedo} normalMap={normal} aoMap={ao} />
    </mesh>
  );
};

export default Floor;
