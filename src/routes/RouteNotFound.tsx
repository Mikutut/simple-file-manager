import { useNavigate } from "react-router";

function RouteNotFoundRoute() {
	const navigate = useNavigate();

	return (
<<<<<<< HEAD
		<div className="route" id="RouteNotFoundRoute">
=======
		<div className="route" id="route-not-found-route">
>>>>>>> b9bb0a0 (UPDATE: Reinstated repo (...))
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