import { useLayoutEffect, useRef } from "react";
import type { AppWindowKey } from "../models";
import { useWindowStore } from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-expect-error - GSAP Draggable has a casing issue on macOS (draggable.d.ts vs Draggable.d.ts)
import Draggable from "gsap/Draggable";

// Register Draggable plugin once at module level
gsap.registerPlugin(Draggable);

export const WindowWrapper = <
	P extends Record<string, never> = Record<string, never>
>(
	Component: React.ComponentType<P>,
	windowKey: AppWindowKey
) => {
	const Wrapped = (props: P) => {
		const focusWindow = useWindowStore((state) => state.focusWindow);
		const windows = useWindowStore((state) => state.windows);
		const { isOpen, zIndex } = windows[windowKey];
		const ref = useRef<HTMLElement>(null);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			el.style.display = "block";
			gsap.fromTo(
				el,
				{
					scale: 0.8,
					opacity: 0,
					y: 40,
				},
				{
					scale: 1,
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: "power3.out",
					clearProps: "all",
				}
			);
		}, [isOpen]);

		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			const [instance] = Draggable.create(el, {
				onPress: () => focusWindow(windowKey),
			});

			return () => instance.kill();
		}, []);

		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;

			el.style.display = isOpen ? "block" : "none";
		}, [isOpen]);

		return (
			<section
				id={windowKey}
				ref={ref}
				style={{ zIndex }}
				className="absolute"
			>
				<Component {...props} />
			</section>
		);
	};

	Wrapped.displayName = `WindowWrapper(${
		Component.displayName || Component.name || "Component"
	})`;

	return Wrapped;
};

export default WindowWrapper;
