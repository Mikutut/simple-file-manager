import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLink, faBars } from "@fortawesome/free-solid-svg-icons";

library.add(
	faGithub,
	faTwitter,
	faDiscord,
	faLink,
	faBars
);

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