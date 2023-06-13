import { Experiment } from "experiment-data";
import { create } from "zustand";

type LabStore = {
  mobile: boolean;
  hovering: boolean;
  muted: boolean;
  hoveredExperiment: Experiment;
};

export const useLabStore = create<LabStore>()(() => ({
  mobile: true,
  hovering: false,
  muted: false,
  hoveredExperiment: "chaos-sphere",
}));
