import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, createSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState } from "./state";
import useParseError from "./hooks/useParseError"

//import DevRouteSelector from "./components/dev/RouteSelector";
import PlatformVersions from "./components/dev/PlatformVersions";

import "./styles/App.scss";
//import HelloWorldRoute from "./routes/HelloWorld";
import TitleBar from "./components/TitleBar";
import HomeRoute from "./routes/Home";
import AboutRoute from "./routes/About";
import SettingsRoute from "./routes/Settings";
import ErrorRoute from "./routes/Error";
import RouteNotFoundRoute from "./routes/RouteNotFound";

function App() {
	const devAPI = window.electronAPI.devAPI;
	const errorHandlingAPI = window.electronAPI.errorHandlingAPI;
	const navigate = useNavigate();

	const [ isDev, setIsDev ] = useState(false);
	const setChromeVersion = useSetRecoilState(chromeVersionState);
	const setNodeVersion = useSetRecoilState(nodeVersionState);
	const setElectronVersion = useSetRecoilState(electronVersionState);
	
	useEffect(() => {
		devAPI.isDev()
			.then((isDev: boolean) => setIsDev(isDev))
			.catch(() => setIsDev(false));

		devAPI.platformVersions()
			.then((versions) => {
				setChromeVersion(versions.chrome);
				setNodeVersion(versions.node);
				setElectronVersion(versions.electron);
			})
			.catch(() => {
				setChromeVersion("N/A");
				setNodeVersion("N/A");
				setElectronVersion("N/A");
			});

		errorHandlingAPI.errorHandler("test", (errorType, errorMessage) => {
			navigate(`/error/${window.electronAPI.nodeAPI.bufferEncode(errorType, "utf-8", "base64url")}/${window.electronAPI.nodeAPI.bufferEncode(errorMessage, "utf-8", "base64url")}`);
		});
	}, []);

	return (
		<div id="app">
			<TitleBar />
			{
			//	(isDev)
			//		? <DevRouteSelector />
			//		: null
			//
			}
			<div id="route-wrapper">
				<Routes>
					<Route path="/" element={<HomeRoute />} />
					<Route path="/about" element={<AboutRoute />} />	
					<Route path="/settings" element={<SettingsRoute />} />
					<Route path="/error/:errortype/:errormessage" element={<ErrorRoute />} />
					<Route path="*" element={<RouteNotFoundRoute />} />
				</Routes>
			</div>
			{
				(isDev)
					? <PlatformVersions />
					: null
			}
		</div>		
	);
}

//export default hot(App);
export default App;