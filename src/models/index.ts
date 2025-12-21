import { locations, type navLinks, type WINDOW_CONFIG } from "../constants";

export type AppWindow = {
	isOpen: boolean;
	zIndex: number;
	data: unknown;
};

// FIXME: This is a workaround to get the keys of the navLinks array.
export type navLinkKey = (typeof navLinks)[number]["type"];
export type AppWindowKey = keyof typeof WINDOW_CONFIG & navLinkKey;

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

export type LocationKey = keyof typeof locations;

export type Location = (typeof locations)[LocationKey];

export type LocationStore = {
	activeLocation: Location;
	setActiveLocation: (location: Location) => void;
	resetActiveLocation: () => void;
};
