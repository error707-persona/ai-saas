import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

interface ImageState {
  image: string;
  setImage: (value: string) => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));

export const useImageStore = create<ImageState>((set) => ({
  image: "",
  setImage: (value: string) => set({ image: value }),
}));
