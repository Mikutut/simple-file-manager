import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./styles/index.scss";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
	<StrictMode>
		<RecoilRoot>
			<HashRouter>
				<App />
			</HashRouter>
		</RecoilRoot>
	</StrictMode>
);
// Pre-React 18
// render(
// 	<StrictMode>
// 		<HashRouter>
// 			<App />
// 		</HashRouter>
// 	</StrictMode>,
// 	document.getElementById("root")
// );