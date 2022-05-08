import { useModalOnClose } from "../Modal";
import { useModal, IModal } from "../../contexts/ModalProvider";
import { IActionButton } from "../ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/ErrorModal.scss";
import ActionButtons from "../ActionButtons";

interface IErrorBtn extends IActionButton {
	activeOn: string[];
}

function ErrorModal({ errorType, errorMessage }: { errorType: string; errorMessage: string | null | undefined; }) {
	const onClose = useModalOnClose();
	
	const buttons: IErrorBtn[] = [
		{
			key: "error-modal-ok-btn",
			label: "OK",
			callback: () => onClose(),
			activeOn: ["test", "settings", "settings/io"]
		},
		{
			key: "error-modal-reload-settings-btn",
			label: "Reload settings",
			callback: () => console.log("Peekaboo"),
			activeOn: ["settings", "settings/io"]
		}
	];
	
	return (
		<div className="error-modal">
			<div className="error-icon">
				<FontAwesomeIcon icon="circle-exclamation" />
			</div>
			<div className="error-info">
				<h1>An error has occured!</h1>
				<h2>Error type: {errorType}</h2>
				<h2>Error message: { errorMessage ?? "unknown" }</h2>
			</div>
			<ActionButtons 
				style={{ gridArea: "action-buttons" }}
				buttons={buttons.filter((v) => v.activeOn.includes(errorType)).map((v) => {
					return {
						key: v.key,
						label: v.label,
						callback: v.callback
					};
				})}
			/>
		</div>
	);
}

function useShowErrorModal() {
	const addToQueue = useModal();

	return function(errorType: string, errorMessage: string | null | undefined, onClose: () => void | null) {
		console.log(`Adding new error modal of type "${errorType}" and message "${errorMessage}"`);
		addToQueue({
			children: <ErrorModal errorType={errorType} errorMessage={errorMessage} />,
			onClose
		});
	}
}

export default useShowErrorModal;