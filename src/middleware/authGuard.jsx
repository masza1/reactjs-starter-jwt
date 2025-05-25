// src/authGuard.js
import { store } from "@src/redux/store";
import { Navigate } from "react-router-dom";

export default function authGuard() {
	const { token } = store.getState().auth;
	return token ? null : <Navigate to="/login" replace />;
}
