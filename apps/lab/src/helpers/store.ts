import { Experiment } from "experiment-data";
import { create } from "zustand";

type LabStore = {
  entered: boolean;
  mobile: boolean;
  hovering: boolean;
  muted: boolean;
  hoveredExperiment: Experiment;
};

export const useLabStore = create<LabStore>()(() => ({
  entered: false,
  mobile: true,
  hovering: false,
  muted: true,
  hoveredExperiment: "chaos-sphere",
}));
