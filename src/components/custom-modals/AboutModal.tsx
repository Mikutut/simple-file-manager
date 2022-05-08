import { useModalOnClose } from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useModal } from "../../contexts/ModalProvider";

import "../../styles/AboutModal.scss";
import ActionButtons from "../ActionButtons";

function AboutModal() {
	const onClose = useModalOnClose();

	return (
		<div className="about-modal">
			<div className="about-info">
				<h1>Simple File Manager</h1>
				<h2>A file manager created using React, TypeScript and Electron</h2>
				<h3>Created by <a href="https://mikut.dev" target="_blank">Marcin "Mikut" Mikuła</a></h3>
			</div>
			<ul className="about-links">
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
			<ActionButtons 
				style={{gridArea: "action-buttons"}}
				buttons={[
					{
						key: "about-modal-ok-btn",
						label: "OK",
						callback: () => onClose()
					}
				]}
			/>
		</div>
	);
}

function useShowAboutModal() {
	const addToQueue = useModal();

	return function(onClose: () => void | null) {
		addToQueue({
			children: <AboutModal />,
			onClose
		});
	}
}

export default useShowAboutModal;