import type { Experiment } from "experiment-data";

import chaossphereImg from "./images/chaossphere.png?url";
import metaballsImg from "./images/metaballs.png?url";
import cosmicplatformImg from "./images/cosmicplatform.png?url";
import skywalkerImg from "./images/skywalker.png?url";
import srankjutsuImg from "./images/srankjutsu.png?url";
import workfromhomeImg from "./images/workfromhome.png?url";
import oceanichorizonImg from "./images/oceanichorizon.png?url";
import retrogamingImg from "./images/retrogaming.png?url";
import extradimensionalinputformImg from "./images/extradimensionalinputform.png?url";

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
