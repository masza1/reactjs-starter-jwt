import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<div className="h-screen flex relative bg-light-background dark:bg-dark-background flex-col items-center justify-center p-4">
				<div className="absolute inset-0 top-0 left-0 w-full h-1/3 bg-radial-[at_50%_200%] to-brand-brown from-brand-olive"></div>
				<div className="relative z-10 max-h-[90vh] overflow-hidden rounded-2xl my-8	 max-w-11/12">
					<div className="overflow-auto h-full scrollbar-thin scrollbar-thumb-brand-brown scrollbar-track-transparent">{children}</div>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;
