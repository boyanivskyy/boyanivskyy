import { useRef } from "react";
import { dockApps, type DockApp } from "../constants";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowStore } from "../store";

const Dock = () => {
	const dockRef = useRef<HTMLDivElement>(null);
	const openWindow = useWindowStore((state) => state.openWindow);
	const closeWindow = useWindowStore((state) => state.closeWindow);
	const windows = useWindowStore((state) => state.windows);

	useGSAP(() => {
		const dock = dockRef.current;
		if (!dock) return;

		const icons = dock.querySelectorAll(".dock-icon");

		const animateIcons = (mouseX: number) => {
			const { left } = dock.getBoundingClientRect();

			icons.forEach((icon) => {
				const { left: iconLeft, width } = icon.getBoundingClientRect();
				const center = iconLeft - left + width / 2;
				const distance = Math.abs(mouseX - center);

				// Steeper falloff (smaller divisor = more focused effect)
				const intensity = Math.exp(-(distance ** 2) / 1800);

				gsap.to(icon, {
					scale: 1 + 0.2 * intensity, // Bigger scale for hovered icon
					y: -20 * intensity,
					duration: 0.25,
					ease: "power2.out",
				});
			});
		};

		const handleMouseMove = (e: MouseEvent) => {
			const { left } = dock.getBoundingClientRect();
			animateIcons(e.clientX - left);
		};

		const resetIcons = () => {
			icons.forEach((icon) =>
				gsap.to(icon, {
					scale: 1,
					y: 0,
					duration: 0.3,
					ease: "power1.out",
				})
			);
		};

		dock.addEventListener("mousemove", handleMouseMove);
		dock.addEventListener("mouseleave", resetIcons);

		return () => {
			dock.removeEventListener("mousemove", handleMouseMove);
			dock.removeEventListener("mouseleave", resetIcons);
		};
	}, []);

	const toggleApp = (app: DockApp) => {
		if (!app.canOpen) return;

		const win = windows[app.id as keyof typeof windows];

		if (!win) {
			console.error(`Window ${app.id} not found`);
		}

		if (win?.isOpen) {
			closeWindow(app.id as keyof typeof windows);
		} else {
			openWindow(app.id as keyof typeof windows);
		}

		console.log(windows);
	};

	return (
		<section id="dock">
			<div ref={dockRef} className="dock-container">
				{dockApps.map((app) => (
					<div key={app.id} className="relative flex justify-center">
						<button
							type="button"
							className="dock-icon"
							aria-label={app.name}
							data-tooltip-id="dock-tooltip"
							data-tooltip-content={app.name}
							data-tooltip-delay-show={150}
							disabled={!app.canOpen}
							onClick={() => toggleApp(app)}
						>
							<img
								src={`/images/${app.icon}`}
								alt={app.name}
								loading="lazy"
								className={app.canOpen ? "" : "opacity-60"}
							/>
						</button>
					</div>
				))}

				<Tooltip id="dock-tooltip" place="top" className="tooltip" />
			</div>
		</section>
	);
};

export default Dock;
