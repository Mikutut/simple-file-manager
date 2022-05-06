import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faLink, faBars, faXmark, faMinus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

library.add(
	faGithub,
	faTwitter,
	faDiscord,
	faLink,
	faBars,
	faXmark,
	faMinus,
	faCircleExclamation
);

import App from "./App";
import "./styles/index.scss";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);
root.render(
		<RecoilRoot>
			<HashRouter>
				<App />
			</HashRouter>
		</RecoilRoot>
);