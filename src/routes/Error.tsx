// TODO: Fix error type and message

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/ErrorRoute.scss";

function ErrorRoute() {
	const params = useParams();
	const [errorType, setErrorType] = useState(window.electronAPI.nodeAPI.bufferEncode(params.errortype, "base64url", "utf-8"));
	const [errorMessage, setErrorMessage] = useState(window.electronAPI.nodeAPI.bufferEncode(params.errormessage, "base64url", "utf-8"));
	const navigate = useNavigate();

	return (
		<div
			className="route" 
			id="error-route"
		>
			<div
				id="error-icon"
			>
				<FontAwesomeIcon
					icon="circle-exclamation"
				/>
			</div>
			<div 
				id="error-info"
			>
				<h1>An error has occurred!</h1>
				<h2 
					id="error-type"
				>
					Error type: <p>{ errorType }</p>
				</h2>
				<h2
					id="error-message"
				>
					Error message: <p>{ errorMessage }</p>
				</h2>
				<button
					onClick={() => navigate('/', { replace: true })}
				>
					OK
				</button>
			</div>
		</div>
	);
}

export default ErrorRoute;