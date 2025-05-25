import { route } from "@src/routes/routeHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	// const navigate = useNavigate();

	// route("login", { aplication: "hcdev" }, { role: "admin", t: "123" });
	route("login", { aplication: "hcdevs" }, { role: "admin", t: "123" });
	// useEffect(() => {
	// }, []);

	return (
		<>
			<h1>Dashboard</h1>
		</>
	);
};

export default Dashboard;
