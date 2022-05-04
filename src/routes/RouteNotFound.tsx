import { useNavigate } from "react-router";

function RouteNotFoundRoute() {
	const navigate = useNavigate();

	return (
		<div className="route" id="route-not-found-route">
			<h1>Nobody here but us chickens!</h1>
			<button
				onClick={() => navigate("/")}
			>
				Go back to home screen
			</button>
		</div>
	)
}

export default RouteNotFoundRoute;