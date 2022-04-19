import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { chromeVersionState, nodeVersionState, electronVersionState } from "../states/platformVersions";
import "../styles/HelloWorldRoute.scss"

function HelloWorldRoute() {
	const [chromeVersion, setChromeVersion] = useRecoilState(chromeVersionState);
	const [nodeVersion, setNodeVersion] = useRecoilState(nodeVersionState);
	const [electronVersion, setElectronVersion] = useRecoilState(electronVersionState);
	const navigate = useNavigate();

	function goToAbout() {
		navigate(`about`);
	}

	return (
		<div className="route" id="HelloWorldRoute">
			<h1>Hello world!</h1>
			<h2>React + TypeScript + Electron</h2>
			<div id="versions">
				<h3>Chrome: { chromeVersion }</h3>
				<h3>Node: { nodeVersion }</h3>
				<h3>Electron: { electronVersion }</h3>
			</div>
			<button onClick={() => goToAbout()}>Go to About page</button>
		</div>
	);
}

export default HelloWorldRoute;