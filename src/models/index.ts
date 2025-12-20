import type { WINDOW_CONFIG } from "../constants";

export type AppWindow = {
	isOpen: boolean;
	zIndex: number;
	data: unknown;
};

export type AppWindowKey = keyof typeof WINDOW_CONFIG;

export type AppWindowStore = {
	windows: Record<AppWindowKey, AppWindow>;
	nextZIndex: number;
	openWindow: (windowKey: AppWindowKey, data?: unknown) => void;
	closeWindow: (windowKey: AppWindowKey) => void;
	focusWindow: (windowKey: AppWindowKey) => void;
};

export type DockApp = {
	id: string;
	name: string;
	icon: string;
	canOpen: boolean;
};
