import { useRecoilValue } from "recoil";
import { titleBarLabelState } from "../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/TitleBar.scss";
import SquareNoFill from "../assets/svg/square-no-fill.svg";

function TitleBar() {
	const titleBarLabel = useRecoilValue(titleBarLabelState);
	const windowManipulationAPI = window.electronAPI.windowManipulationAPI;

	const minimizeWindow = () => {
		windowManipulationAPI.minimizeWindow();
	};
	const toggleMaximizeWindow = () => {
		windowManipulationAPI.toggleWindowMaximization();
	};
	const closeWindow = () => {
		windowManipulationAPI.closeWindow();
	};

	return (
		<div id="title-bar">
			<span
				id="title-bar-label"
			>
				{ titleBarLabel }	
			</span>
			<div id="title-bar-buttons">
				<div 
					className="title-bar-button"
					data-titlebaraction="minimize"
					onClick={() => minimizeWindow()}
				>
					<FontAwesomeIcon
						icon="minus"
					/>
				</div>
				<div 
					className="title-bar-button"
					data-titlebaraction="maximize"
					onClick={() => toggleMaximizeWindow()}
				>
					<SquareNoFill />
				</div>
				<div 
					className="title-bar-button"
					data-titlebaraction="close"
					onClick={() => closeWindow()}
				>
					<FontAwesomeIcon
						icon="xmark"
					/>
				</div>
			</div>
		</div>
	);
}

export default TitleBar;