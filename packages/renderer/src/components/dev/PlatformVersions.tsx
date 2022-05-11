import { version as reactVersion } from "react";
import { useRecoilValue } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState } from "../../state";

import "../../styles/PlatformVersions.scss";

function PlatformVersions() {
	const chromeVersion = useRecoilValue(chromeVersionState);
	const nodeVersion = useRecoilValue(nodeVersionState);
	const electronVersion = useRecoilValue(electronVersionState);

	return (
		<div id="platform-versions">
			<a
				href="https://chromium.org"
				target="_blank"
			>
				<span>Chrome: { chromeVersion }</span>
			</a>
			<a
				href="https://nodejs.org"
				target="_blank"
			>
				<span>Node: { nodeVersion }</span>
			</a>
			<a
				href="https://electronjs.org"
				target="_blank"
			>
				<span>Electron: { electronVersion }</span>
			</a>
			<a
				href="https://reactjs.org"
				target="_blank"
			>
				<span>React: { reactVersion }</span>
			</a>
		</div>
	);
}

export default PlatformVersions;