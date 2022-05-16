import "../styles/ActionButton.scss";

interface IActionButton {
	key: string;
	label: string;
	callback: () => void;
	style?: Record<string, string>;
}

function ActionButton( btnProps: IActionButton ) {
	return (
		<button
			className="action-button"
			style={btnProps.style}
			onClick={() => btnProps.callback()}
		>
			{ btnProps.label }
		</button>
	);
}

export default ActionButton;
export type {
	IActionButton
};