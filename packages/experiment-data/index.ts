import chaosSphereImg from "./images/chaossphere.png";
import { StaticImageData } from "next/image";

const experiments = [
  "metaballs",
  "work-from-home",
  "s-rank-jutsu",
  "skywalker",
  "chaos-sphere",
  "cosmic-platform",
  "oceanic-horizon",
  "extra-dimensional-input-form",
] as const;

export type Experiment = typeof experiments[number];

export type ExperimentDatum = {
  name: string;
  label: string;
  pathName: string;
  image?: StaticImageData;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
  metaballs: {
    name: "metaballs",
    label: "Metaballs",
    pathName: "Metaballs",
  },
  "work-from-home": {
    name: "work-from-home",
    label: "Work From Home",
    pathName: "WorkFromHome",
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
  "oceanic-horizon": {
    name: "oceanic-horizon",
    label: "Oceanic Horizon",
    pathName: "OceanicHorizon",
  },
  "extra-dimensional-input-form": {
    name: "extra-dimensional-input-form",
    label: "Extra Dimensional Input Form",
    pathName: "ExtraDimensionalInputForm",
  },
};
