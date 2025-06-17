// src/authGuard.js
import { store } from "@src/redux/store";
import { Navigate } from "react-router-dom";

export default function authGuard() {
	const { accessToken } = store.getState().auth;
	// console.log(store.getState().auth);
	
	return accessToken ? null : <Navigate to="/login" replace />;
}
