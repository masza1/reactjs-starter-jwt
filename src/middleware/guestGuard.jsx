// src/authGuard.js
import { store } from "@src/redux/store";
import { route } from "@src/routes/routeHelper";
import { Navigate } from "react-router-dom";

export default function guestGuard({ user }) {
	const { token } = store.getState().auth;

	return !token ? null : <Navigate to={route("dashboard")} replace />;
}
