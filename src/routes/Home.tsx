import { useNavigate } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import { IActionButton } from "../components/ActionButton";

import "../styles/HomeRoute.scss";

function HomeRoute() {
	const navigate = useNavigate();

	const buttons: IActionButton[] = [
		{
			key: "home-settings",
			label: "Settings",
			callback: () => navigate("/settings")
		}
	];

	return (
		<div className="route" id="home-route">
			<h1>Home Route</h1>
			<ActionButtons buttons={buttons} />
		</div> 
	);
}

export default HomeRoute;