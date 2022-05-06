import { useLayoutEffect, PropsWithChildren } from "react";
import ActionButton, { IActionButton } from "./ActionButton";

import "../styles/ActionButton.scss";

function ActionButtons({ children, buttons, style }: PropsWithChildren<{ buttons: IActionButton[], style?: Record<string, string> }>) {
	
	return (
		<div
			className="action-buttons-container"
			style={style}
		>
			{
				(buttons)
					?	buttons.map((v) => { 
							console.log(JSON.stringify(v, null, 2));	
						
							return (
								<ActionButton
									key={v.key}
									label={v.label}
									callback={v.callback}
									style={v.style}
								/>
							);
						})
					: children
			}
		</div>
	);
}

export default ActionButtons;