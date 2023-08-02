import { BufferGeometry, Material, Mesh } from "three";

export type MeshType<T extends Material> = Mesh<BufferGeometry, T>;
