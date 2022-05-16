import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState, settingsState, lastOpenedDirectoryState, currentDirectoryState } from "./state";
import { IPlatformVersions, ISettingsScheme } from "@c/common";
//import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useTransition, animated } from "react-spring";
import useShowErrorModal from "./components/custom-modals/ErrorModal";

//import DevRouteSelector from "./components/dev/RouteSelector";
import PlatformVersions from "./components/dev/PlatformVersions";

import "./styles/App.scss";

//import HelloWorldRoute from "./routes/HelloWorld";
import TitleBar from "./components/TitleBar";
import HomeRoute from "./routes/Home";
import AboutRoute from "./routes/About";
import SettingsRoute from "./routes/Settings";
import DirectoryViewRoute from "./routes/DirectoryView";
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
	const settings = useRecoilValue(settingsState);
	const lastOpenedDirectory = useRecoilValue(lastOpenedDirectoryState);
	const setCurrentDirectory = useSetRecoilState(currentDirectoryState);

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

	const showErrorModal = useShowErrorModal();

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

			showErrorModal(errorType, errorMessage, null);
		});

		devAPI.getIsDev();
		devAPI.getPlatformVersions();

		settingsAPI.readSettings()
			.then((rawSettings: string) => {
				console.log(`Setting local settings...`);
				return setSettings(JSON.parse(rawSettings) as ISettingsScheme);
			})
			.catch((errData: string[]) => { 
				console.log("An error has occurred while loading settings! Error: ", errData);
				window.electronAPI.errorAPI.reportError(errData[0], errData[1]);
			});

		if(settings.initMode === "last-opened") {
			setCurrentDirectory(settings.lastOpened);
			navigate("/directory");
		}
		//settingsAPI.forceLoadDefaults()
		//	.then((rawSettings: string) => {
		//		console.log(`Setting local settings...`);
		//		setSettings(JSON.parse(rawSettings) as ISettingsScheme);
		//	})
		//	.catch((errData: string[]) => window.electronAPI.errorAPI.reportError(errData[0], errData[1]));
	}, []);

	return (
		<div id="app">
			<TitleBar />
			{
				routeTransition((props, item) => (
					<animated.div style={props} id="route-wrapper">
						<Routes location={item}>
							<Route index element={<HomeRoute />} />
							<Route path="/settings" element={<SettingsRoute />} />
							<Route path="/about" element={<AboutRoute />} />
							<Route path="/directory" element={<DirectoryViewRoute />} />
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