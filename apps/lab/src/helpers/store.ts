import { create } from "zustand";

type LabStore = {
  hovering: boolean;
  muted: boolean;
};

export const useLabStore = create<LabStore>()(() => ({
  hovering: false,
  muted: false,
}));
