<<<<<<< HEAD
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
>>>>>>> b9bb0a0 (UPDATE: Reinstated repo (...))
import { version as reactVersion } from "react";
import { useRecoilValue } from "recoil";
import { chromeVersionState, nodeVersionState, electronVersionState } from "../state";
import "../styles/AboutRoute.scss";

function AboutRoute() {
	const chromeVersion = useRecoilValue(chromeVersionState);
	const nodeVersion = useRecoilValue(nodeVersionState);
	const electronVersion = useRecoilValue(electronVersionState);

	return (
		<div className="route" id="about-route">
			<div id="about-info">
				<h1>Simple File Manager</h1>
				<h2>A file manager created using React, TypeScript and Electron</h2>
				<h3>Created by <a href="https://mikut.dev" target="_blank">Marcin "Mikut" Mikuła</a></h3>
				<h3><a href="https://github.com/Mikutut/simple-file-manager" target="_blank">Project's source code</a></h3>
			</div>
			<ul 
				className="fa-ul"
				id="about-links"
			>
				<li>
					<a
						href="https://github.com/Mikutut/simple-file-manager"
						target="_blank"
					>
						<FontAwesomeIcon 
							icon={faLink}
							fixedWidth
						/>
						<span>
							Project's GitHub repository
						</span>
					</a>
				</li>
				<li>
					<a
						href="https://mikut.dev"
						target="_blank"
					>
						<FontAwesomeIcon 
							icon={faLink}
							fixedWidth
						/>
						<span>
							My website
						</span>
					</a>
				</li>
				<li>
					<a
						href="https://mikut.dev/github"
						target="_blank"
					>
						<FontAwesomeIcon 
							icon={faGithub}
							fixedWidth
						/>
						<span>
							GitHub profile
						</span>
					</a>
				</li>
				<li>
					<a
						href="https://mikut.dev/twitter"
						target="_blank"
					>
						<FontAwesomeIcon 
							icon={faTwitter}
							fixedWidth
						/>
						<span>
							Twitter
						</span>
					</a>
				</li>
				<li>
					<a
						href="https://mikut.dev/discord"
						target="_blank"
					>
						<FontAwesomeIcon 
							icon={faDiscord}
							fixedWidth
						/>
						<span>
							Discord
						</span>
					</a>
				</li>
			</ul>
			<div id="about-versions">
				<span>Chrome: { chromeVersion }</span>
				<span>Node: { nodeVersion }</span>
				<span>Electron: { electronVersion }</span>
				<span>React: { reactVersion }</span>
			</div>
		</div>
	);
}

export default AboutRoute;