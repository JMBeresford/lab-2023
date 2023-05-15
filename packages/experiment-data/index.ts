const experiments = [
  "chaos-sphere",
  "cosmic-platform",
  "work-from-home",
  "extra-dimensional-input-form",
] as const;

export type Experiment = typeof experiments[number];

export type ExperimentDatum = {
  name: string;
  label: string;
  pathName: string;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
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
};
