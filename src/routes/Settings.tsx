import { useRecoilValue } from "recoil";
import { settingsState } from "../state";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import { IActionButton } from "../components/ActionButton";

import "../styles/SettingsRoute.scss";

function SettingsRoute() {
	const settings = useRecoilValue(settingsState);
	const navigate = useNavigate();
	const buttons: IActionButton[] = [
		{
			key: "settings-go-back",
			label: "Go back",
			callback: () => navigate(-1)
		}
	];

	return (
		<div className="route" id="settings-route">
			<h1>Settings</h1>
			<code>{ JSON.stringify(settings, null, 2) }</code>
			<ActionButtons buttons={buttons} />
		</div>
	)
}

export default SettingsRoute;