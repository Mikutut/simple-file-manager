import { useNavigate } from "react-router";
import { IActionButton } from "../components/ActionButton";
import ActionButtons from "../components/ActionButtons";

import "../styles/RouteNotFound.scss";

function RouteNotFoundRoute() {
	const navigate = useNavigate();

	const actionButtons: IActionButton[] = [
		{
			key: "route-not-found-go-back-to-home-screen",
			label: "Go back to home screen",
			callback: () => navigate("/")
		}
	];

	return (
		<div className="route" id="route-not-found-route">
			<h1>Nobody here but us chickens!</h1>
			<ActionButtons buttons={actionButtons} />
		</div>
	)
}

export default RouteNotFoundRoute;