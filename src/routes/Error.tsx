// TODO: Fix error type and message

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IActionButton } from "../components/ActionButton";
import ActionButtons from "../components/ActionButtons";

import "../styles/ErrorRoute.scss";

interface IErrorBtn extends IActionButton {
	excludeFrom: string[];
}

function ErrorRoute() {
	const params = useParams();
	const [errorType, setErrorType] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const buttons: IErrorBtn[] = [
		{
			key: "action-btn-error-ok",
			label: "OK",
			callback: () => navigate(-1),
			excludeFrom: [],
		},
		{
			key: "action-btn-error-reload-settings",
			label: "Reload settings",
			callback: () => {
				window.electronAPI.settingsAPI.loadSettings();
				window.electronAPI.settingsAPI.readSettings();
			},
			excludeFrom: ["test"],
		}
	]; 

	const extractButtons = (errorType: string) => {
		const btns = buttons.filter((v) => !(v.excludeFrom.includes(errorType)));

		return btns;
	}
	useEffect(() => {
		const [ errType, errMsg ] = JSON.parse(window.electronAPI.nodeAPI.bufferEncode(params.errordetails, "base64url", "utf-8")) as string[];

		setErrorType(errType);
		setErrorMessage(errMsg);
	}, []);

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
			</div>
			<ActionButtons 
				buttons={extractButtons(errorType).map((v) => {
					return {
						key: v.key,
						label: v.label,
						callback: v.callback
					} as IActionButton;
				})}
			/>
		</div>
	);
}

export default ErrorRoute;