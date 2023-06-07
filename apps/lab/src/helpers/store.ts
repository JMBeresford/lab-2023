import { create } from "zustand";

type LabStore = {
  mobile: boolean;
  hovering: boolean;
  muted: boolean;
};

export const useLabStore = create<LabStore>()(() => ({
  mobile: true,
  hovering: false,
  muted: false,
}));
