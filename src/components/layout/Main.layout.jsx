import { route } from "@src/routes/routeHelper";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	route("dashboard");
	return (
		<>
			<p>Main Layout</p>
			<Outlet />
		</>
	);
};

export default MainLayout;
