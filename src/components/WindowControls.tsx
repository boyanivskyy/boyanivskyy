import type { AppWindowKey } from "../models";
import { useWindowStore } from "../store";

const WindowControls = ({ target }: { target: AppWindowKey }) => {
	const closeWindow = useWindowStore((state) => state.closeWindow);

	return (
		<div id="window-controls">
			<div className="close" onClick={() => closeWindow(target)} />
			<div className="minimize" />
			<div className="maximize" />
		</div>
	);
};

export default WindowControls;
