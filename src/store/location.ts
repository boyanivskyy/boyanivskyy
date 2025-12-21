import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";
import type { Location, LocationStore } from "../models";

const DEFAULT_LOCATION = locations.work;

export const useLocationStore = create<LocationStore>()(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,
		setActiveLocation: (location: Location) =>
			set((state) => {
				state.activeLocation = location;
			}),

		resetActiveLocation: () =>
			set((state) => {
				state.activeLocation = DEFAULT_LOCATION;
			}),
	}))
);
