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

export type Experiment = typeof experiments[number];

export type ExperimentDatum = {
  name: string;
  label: string;
  pathName: string;
  image?: string;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
  "retro-gaming": {
    name: "retro-gaming",
    label: "Retro Gaming",
    pathName: "RetroGaming",
    image: retrogamingImg,
  },
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
    image: oceanichorizonImg,
  },
  "extra-dimensional-input-form": {
    name: "extra-dimensional-input-form",
    label: "Extra Dimensional Input Form",
    pathName: "ExtraDimensionalInputForm",
    image: extradimensionalinputformImg,
  },
};
