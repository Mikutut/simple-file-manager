import { useNavigate } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import { IActionButton } from "../components/ActionButton";
import useShowAboutModal from "../components/custom-modals/AboutModal";

import "../styles/HomeRoute.scss";

function HomeRoute() {
	const navigate = useNavigate();
	const showAboutModal = useShowAboutModal();

	const buttons: IActionButton[] = [
		{
			key: "home-route-settings-btn",
			label: "Settings",
			callback: () => navigate("/settings")
		},
		{
			key: "home-route-about-btn",
			label: "About",
			callback: () => showAboutModal(null)
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