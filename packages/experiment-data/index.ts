const experiments = ["chaos-sphere", "cosmic-platform", "work-from-home"] as const;

export type Experiment = (typeof experiments)[number];

export type ExperimentDatum = {
  name: string;
  label: string;
  devPort: number;
  liveUrl: string;
};

export const ExperimentData: Record<Experiment, ExperimentDatum> = {
  "chaos-sphere": {
    name: "chaos-sphere",
    label: "Chaos Sphere",
    devPort: 10000,
    liveUrl: "https://chaos-sphere.vercel.app",
  },
  "cosmic-platform": {
    name: "cosmic-platform",
    label: "Cosmic Platform",
    devPort: 10001,
    liveUrl: "https://cosmic-platform.vercel.app/",
  },
  "work-from-home": {
    name: "work-from-home",
    label: "Work From Home",
    devPort: 10002,
    liveUrl: "https://work-from-home.netlify.app/",
  },
};
