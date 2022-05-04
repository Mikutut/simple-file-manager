import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ipcRenderer } from "electron";
import { useRecoilState } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState } from "./state";
import "./styles/App.scss";
//import HelloWorldRoute from "./routes/HelloWorld";
import HomeRoute from "./routes/Home";
import AboutRoute from "./routes/About";
import SettingsRoute from "./routes/Settings";
import RouteNotFoundRoute from "./routes/RouteNotFound";

function App() {
	const [ isDev, setIsDev ] = useState(false);
	const [chromeVersion, setChromeVersion] = useRecoilState(chromeVersionState);
	const [nodeVersion, setNodeVersion] = useRecoilState(nodeVersionState);
	const [electronVersion, setElectronVersion] = useRecoilState(electronVersionState);
	
	useEffect(() => {
		setIsDev(ipcRenderer.sendSync("is-dev-request"));
		const versions = ipcRenderer.sendSync("platform-versions-request");

		setChromeVersion(versions.chrome);
		setNodeVersion(versions.node);
		setElectronVersion(versions.electron);
	}, []);

	return (
		<div id="App">
			<Routes>
				<Route path="/" element={<HomeRoute />} />
				<Route path="/about" element={<AboutRoute />} />	
				<Route path="/settings" element={<SettingsRoute />} />
				<Route path="*" element={<RouteNotFoundRoute />} />
			</Routes>
		</div>		
	);
}

export default App;