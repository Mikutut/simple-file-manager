import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";

import "../styles/AboutRoute.scss";

function AboutRoute() {
	return (
		<div className="route" id="about-route">
			<div id="about-info">
				<h1>Simple File Manager</h1>
				<h2>A file manager created using React, TypeScript and Electron</h2>
				<h3>Created by <a href="https://mikut.dev" target="_blank">Marcin "Mikut" Mikuła</a></h3>
			</div>
			<ul id="about-links">
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
		</div>
	);
}

export default AboutRoute;