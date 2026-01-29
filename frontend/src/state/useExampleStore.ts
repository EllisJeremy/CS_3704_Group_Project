import { create } from "zustand";

type ExampleStoreType = {
  exampleNumber: number;
  setExampleNumber: (exampleNumber: number) => void;
};

export const useExampleStore = create<ExampleStoreType>((set) => ({
  exampleNumber: 0,
  setExampleNumber: (exampleNumber) => set({ exampleNumber }),
}));
