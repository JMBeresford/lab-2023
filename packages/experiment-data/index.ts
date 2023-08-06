import chaossphereImg from "./images/chaossphere.png?url";
import metaballsImg from "./images/metaballs.png?url";
import cosmicplatformImg from "./images/cosmicplatform.png?url";
import skywalkerImg from "./images/skywalker.png?url";
import srankjutsuImg from "./images/srankjutsu.png?url";
import workfromhomeImg from "./images/workfromhome.png?url";
import oceanichorizonImg from "./images/oceanichorizon.png?url";
import retrogamingImg from "./images/retrogaming.png?url";
import extradimensionalinputformImg from "./images/extradimensionalinputform.png?url";

const experiments = [
  "retro-gaming",
  "metaballs",
  "work-from-home",
  "s-rank-jutsu",
  "skywalker",
  "chaos-sphere",
  "cosmic-platform",
  "oceanic-horizon",
  "extra-dimensional-input-form",
] as const;

export type Experiment = typeof experiments[number] | (string & {});

export type ExperimentDatum = {
  name: Experiment;
  label: string;
  pathName: string;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
  "retro-gaming": {
    name: "retro-gaming",
    label: "Retro Gaming",
    pathName: "RetroGaming",
  },
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

export const ExperimentImages: Record<Experiment, string> = {
  "retro-gaming": retrogamingImg,
  metaballs: metaballsImg,
  "work-from-home": workfromhomeImg,
  "s-rank-jutsu": srankjutsuImg,
  skywalker: skywalkerImg,
  "chaos-sphere": chaossphereImg,
  "cosmic-platform": cosmicplatformImg,
  "oceanic-horizon": oceanichorizonImg,
  "extra-dimensional-input-form": extradimensionalinputformImg,
};
