import { MuiIcon } from "@src/components";
import { logout } from "@src/redux/actions/auth/authAction";
import { route } from "@src/routes/routeHelper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const dispatch = useDispatch();

	return (
		<>
			<div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-md">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
					<div>
						<div className="text-gray-500 dark:text-gray-400 text-sm">Welcome back,</div>
						<div className="text-2xl font-bold text-gray-800 dark:text-white">
							User ID: <span className="text-brand-gray">#12345678</span>
						</div>
					</div>
					<div className="flex items-center gap-6">
						<div className="bg-brand-brown/30 rounded-xl px-6 py-4 flex flex-col items-start shadow">
							<span className="text-brand-brown dark:text-gray-300 text-xs">Saldo</span>
							<span className="text-2xl font-semibold text-brand-brown dark:text-blue-300">Rp 12.345.678</span>
						</div>

						<MuiIcon outlined iconName="power_settings_circle" className="text-5xl" onClick={() => dispatch(logout())} />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Link to={route("rawat-jalan")}>
						<div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-brand-gray/10">
							<MuiIcon iconName="table_view" className="text-5xl mr-4" />
							<div>
								<div className="text-lg font-semibold">Rawat Jalan</div>
								<div className="text-gray-500 dark:text-gray-400 text-sm">Laporan Rawat Jalan</div>
							</div>
						</div>
					</Link>
					<Link to={route("biaya-perawatan")}>
						<div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-brand-gray/10">
							<MuiIcon iconName="table_view" className="text-5xl mr-4" />
							<div>
								<div className="text-lg font-semibold">Biaya Perawatan</div>
								<div className="text-gray-500 dark:text-gray-400 text-sm">Laporan Biaya Perawatan</div>
							</div>
						</div>
					</Link>
					<Link to={route("buku-besar-pensiunan")}>
						<div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-brand-gray/10">
							<MuiIcon iconName="table_view" className="text-5xl mr-4" />
							<div>
								<div className="text-lg font-semibold">Buku Besar Pensiunan</div>
								<div className="text-gray-500 dark:text-gray-400 text-sm">Buku Besar Pensiunan</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
