import chaossphereImg from "./images/chaossphere.png";
import metaballsImg from "./images/metaballs.png";
import cosmicplatformImg from "./images/cosmicplatform.png";
import skywalkerImg from "./images/skywalker.png";
import srankjutsuImg from "./images/srankjutsu.png";
import workfromhomeImg from "./images/workfromhome.png";

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
  image?: string;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
  metaballs: {
    name: "metaballs",
    label: "Metaballs",
    pathName: "Metaballs",
    image: metaballsImg,
  },
  "work-from-home": {
    name: "work-from-home",
    label: "Work From Home",
    pathName: "WorkFromHome",
    image: workfromhomeImg,
  },
  "s-rank-jutsu": {
    name: "s-rank-jutsu",
    label: "S-Rank Jutsu",
    pathName: "SRankJutsu",
    image: srankjutsuImg,
  },
  skywalker: {
    name: "skywalker",
    label: "Skywalker",
    pathName: "Skywalker",
    image: skywalkerImg,
  },
  "chaos-sphere": {
    name: "chaos-sphere",
    label: "Chaos Sphere",
    pathName: "ChaosSphere",
    image: chaossphereImg,
  },
  "cosmic-platform": {
    name: "cosmic-platform",
    label: "Cosmic Platform",
    pathName: "CosmicPlatform",
    image: cosmicplatformImg,
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
