import { Search } from "lucide-react";
import { WindowControls } from "../components";
import { WindowWrapper } from "../hoc";
import { locations } from "../constants";
import { useLocationStore, useWindowStore } from "../store";
import clsx from "clsx";
import type { AppWindowKey, Location } from "../models";

export const FinderWindow = () => {
	const { openWindow } = useWindowStore();
	const { activeLocation, setActiveLocation } = useLocationStore();

	type ListItem = {
		id: number;
		name: string;
		icon: string;
	};

	//@ts-ignore
	const openItem = (item) => {
		if (item.fileType === "pdf") return openWindow("resume");
		if (item.kind === "folder") return setActiveLocation(item as Location);
		if (["fig", "url"].includes(item.fileType) && item.href)
			return window.open(item.href, "_blank");

		openWindow(`${item.fileType}${item.kind}` as AppWindowKey, item);
	};

	const renderList = (name: string, list: ListItem[]) => (
		<div>
			<h3>{name}</h3>

			<ul>
				{list.map((item) => (
					<li
						key={item.id}
						className={clsx(
							item.id === activeLocation.id
								? "active"
								: "not-active"
						)}
						onClick={() => setActiveLocation(item as Location)}
					>
						<img src={item.icon} className="w-4" alt={item.name} />
						<p className="text-sm font-medium truncate">
							{item.name}
						</p>
					</li>
				))}
			</ul>
		</div>
	);

	return (
		<>
			<div id="window-header">
				<WindowControls target="finder" />
				<Search className="icon" />
			</div>

			<div className="bg-white flex h-full">
				<div className="sidebar">
					{renderList("Favorites", Object.values(locations))}
					{renderList("Work", Object.values(locations.work.children))}
				</div>

				<ul className="content">
					{activeLocation?.children.map((item) => (
						<li
							key={item.id}
							className={item.position}
							onClick={() => openItem(item)}
						>
							<img src={item.icon} alt={item.name} />
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export const Finder = WindowWrapper(FinderWindow, "finder");
