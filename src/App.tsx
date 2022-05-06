import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState, settingsState } from "./state";
import { IPlatformVersions, ISettings } from "./common";
//import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useTransition, animated } from "react-spring";

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
	const settingsAPI = window.electronAPI.settingsAPI;
	const ipcAPI = window.electronAPI.ipcAPI;

	const navigate = useNavigate();
	const location = useLocation();

	const [ isDev, setIsDev ] = useState(false);
	const setChromeVersion = useSetRecoilState(chromeVersionState);
	const setNodeVersion = useSetRecoilState(nodeVersionState);
	const setElectronVersion = useSetRecoilState(electronVersionState);
	const setSettings = useSetRecoilState(settingsState);

	const routeTransition = useTransition(location, {
		from: { opacity: 0, transform: "scale(1.05)" },
		enter: { opacity: 1, transform: "scale(1)" },
		leave: { opacity: 0, transform: "scale(0.95)" },
		delay: 0,
		exitBeforeEnter: true,
		config: {
			duration: 100
		},
		expires: true
	});

	useEffect(() => {
		ipcAPI.registerIPCCallback("dev-navigate", (path) => { 
			console.log(`DEV: Navigating to "${path}"...`);
			navigate(path);
		});
		ipcAPI.registerIPCCallback("is-dev", (isDev: boolean) => setIsDev(isDev));
		ipcAPI.registerIPCCallback("platform-versions", (versionsRaw: string) => {
			const versions = JSON.parse(versionsRaw) as IPlatformVersions;
			setChromeVersion(versions.chrome);
			setNodeVersion(versions.node);
			setElectronVersion(versions.electron);
		});
		ipcAPI.registerIPCCallback("error-thrown", (errorType: string, errorMessage: string) => {
			console.log(`Received new error!\nType: "${errorType}"\nMessage: "${errorMessage}"`);
			const errDetails = window.electronAPI.nodeAPI.bufferEncode(JSON.stringify([errorType, errorMessage]), "utf-8", "base64url");

			navigate(`/error/${errDetails}`);
		});
		ipcAPI.registerIPCCallback("read-settings", (settings) => {
			console.log(`Setting local settings...`);
			setSettings(JSON.parse(settings) as ISettings);
		});

		devAPI.getIsDev();
		devAPI.getPlatformVersions();

		settingsAPI.loadSettings();
		settingsAPI.readSettings();
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
			{
				routeTransition((props, item) => (
					<animated.div style={props} id="route-wrapper">
						<Routes location={item}>
							<Route index element={<HomeRoute />} />
							<Route path="/settings" element={<SettingsRoute />} />
							<Route path="/about" element={<AboutRoute />} />
							<Route path="/error/:errordetails" element={<ErrorRoute />} />
							<Route path="*" element={<RouteNotFoundRoute />} />
						</Routes>
					</animated.div>
				))
			}
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