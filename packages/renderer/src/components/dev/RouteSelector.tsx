import { useNavigate } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/DevRouteSelector.scss";

function DevRouteSelector() {
	const [isHidden, setIsHidden] = useState(true);
	const navigate = useNavigate();

	return (
		<div id="dev-route-selector" data-isdev>
			<div
				className="dev-route-selector-btn"
				id="dev-route-selector-switch"
				onClick={() => setIsHidden(!isHidden)}
			>
				<FontAwesomeIcon 
					id="dev-route-selector-switch"
					icon="bars"
					fixedWidth
				/>
			</div>
			{
				(!isHidden)
					? <div id="dev-route-selector-list">
							<button
								className="dev-route-selector-btn"
								onClick={() => navigate("/")}
							>
								H
							</button>
							<button
								className="dev-route-selector-btn"
								onClick={() => navigate("/about")}
							>
								A
							</button>
							<button
								className="dev-route-selector-btn"
								onClick={() => navigate("/settings")}
							>
								S
							</button>
							<button
								className="dev-route-selector-btn"
								onClick={() => navigate("/route-not-found")}
							>
								R
							</button>
						</div>
					: null
			}
		</div>
	)
}

export default DevRouteSelector;