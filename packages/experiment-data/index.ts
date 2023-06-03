import chaosSphereImg from "./images/chaossphere.png";
import { StaticImageData } from "next/image";

const experiments = [
  "chaos-sphere",
  "cosmic-platform",
  "work-from-home",
  "extra-dimensional-input-form",
  "oceanic-horizon",
  "s-rank-jutsu",
  "skywalker",
  "metaballs",
] as const;

export type Experiment = typeof experiments[number];

export type ExperimentDatum = {
  name: string;
  label: string;
  pathName: string;
  image?: StaticImageData;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
  "chaos-sphere": {
    name: "chaos-sphere",
    label: "Chaos Sphere",
    pathName: "ChaosSphere",
    image: chaosSphereImg,
  },
  "cosmic-platform": {
    name: "cosmic-platform",
    label: "Cosmic Platform",
    pathName: "CosmicPlatform",
  },
  "work-from-home": {
    name: "work-from-home",
    label: "Work From Home",
    pathName: "WorkFromHome",
  },
  "extra-dimensional-input-form": {
    name: "extra-dimensional-input-form",
    label: "Extra Dimensional Input Form",
    pathName: "ExtraDimensionalInputForm",
  },
  "oceanic-horizon": {
    name: "oceanic-horizon",
    label: "Oceanic Horizon",
    pathName: "OceanicHorizon",
  },
  "s-rank-jutsu": {
    name: "s-rank-jutsu",
    label: "S-Rank Jutsu",
    pathName: "SRankJutsu",
  },
  skywalker: {
    name: "skywalker",
    label: "Skywalker",
    pathName: "Skywalker",
  },
  metaballs: {
    name: "metaballs",
    label: "Metaballs",
    pathName: "Metaballs",
  },
};
