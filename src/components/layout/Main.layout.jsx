import { route } from "@src/routes/routeHelper";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setAuthToken, setCsrfToken } from "@src/utils/apiClient";
import { getUserProfile } from "@src/redux/actions/auth/authAction";

const MainLayout = () => {
	const { isAuthenticated, accessToken, csrfToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		if (isAuthenticated) {
			// Set the authentication token and CSRF token in the API client
			setAuthToken(accessToken);
			setCsrfToken(csrfToken);
			// console.log("Access Token:", accessToken);

			dispatch(getUserProfile());
		} else {
			setAuthToken(null);
			setCsrfToken(null);
		}
	}, [dispatch, isAuthenticated, accessToken, csrfToken]);

	return (
		<>
			<Layout>
				<Outlet />
			</Layout>
		</>
	);
};

export default MainLayout;
