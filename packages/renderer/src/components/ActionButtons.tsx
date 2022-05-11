import ActionButton, { IActionButton } from "./ActionButton";

import "../styles/ActionButton.scss";

function ActionButtons({ buttons, style }: { buttons: IActionButton[], style?: Record<string, string> }) {
	
	return (
		<div
			className="action-buttons-container"
			style={style}
		>
			{
				buttons.map((v) => { 
					return (
						<ActionButton
							key={v.key}
							label={v.label}
							callback={v.callback}
							style={v.style}
						/>
					);
				})
			}
		</div>
	);
}

export default ActionButtons;