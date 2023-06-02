import { create } from "zustand";

type LabStore = {
  hovering?: boolean;
};

export const useLabStore = create<LabStore>()(() => ({
  hovering: false,
}));
