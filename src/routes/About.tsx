import { version as reactVersion } from "react";
import { useRecoilState } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState } from "../states/platformVersions";
import "../styles/AboutRoute.scss";

function AboutRoute() {
	const [chromeVersion, setChromeVersion] = useRecoilState(chromeVersionState);
	const [nodeVersion, setNodeVersion] = useRecoilState(nodeVersionState);
	const [electronVersion, setElectronVersion] = useRecoilState(electronVersionState);

	return (
		<div className="route" id="AboutRoute">
			<div id="info">
				<h1>Simple File Manager</h1>
				<h2>A file manager created using React, TypeScript and Electron</h2>
				<h3>Created by <a href="https://mikut.dev" target="_blank">Marcin "Mikut" Mikuła</a></h3>
				<h3><a href="https://github.com/Mikutut/simple-file-manager" target="_blank">Project's source code</a></h3>
			</div>
			<div id="versions">
				<span>Chrome: { chromeVersion }</span>
				<span>Node: { nodeVersion }</span>
				<span>Electron: { electronVersion }</span>
				<span>React: { reactVersion }</span>
			</div>
		</div>
	);
}

export default AboutRoute;