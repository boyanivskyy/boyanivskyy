import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";
// The `import type` syntax is a TypeScript feature that only imports the type information from a module.
// This means that at runtime, this import is erased and does not produce any JavaScript import statements,
// which helps reduce bundle size and avoids unnecessary dependencies in production code.
// Here, we are importing just the `AppWindowStore` type from "../models" for type-checking purposes,
// but not any runtime code from that file.

import type { AppWindowStore } from "../models";

export const useWindowStore = create<AppWindowStore>()(
	immer((set) => ({
		windows: WINDOW_CONFIG,
		nextZIndex: INITIAL_Z_INDEX + 1,

		openWindow: (windowKey, data = null) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;

				win.isOpen = true;
				win.zIndex = state.nextZIndex;
				win.data = data;
				state.nextZIndex++;
			}),

		closeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				win.isOpen = false;
				win.zIndex = INITIAL_Z_INDEX;
				win.data = null;
			}),

		focusWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				win.zIndex = state.nextZIndex++;
			}),
	}))
);
