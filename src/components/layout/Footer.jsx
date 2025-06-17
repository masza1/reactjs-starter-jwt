import momentId from "@src/utils/moment-locale-id";

const Footer = () => {
	return (
		<>
			{/* Footer */}
			<div className="mt-10 text-xs text-brand-slate text-center space-y-1">
				{/* <div className="space-x-4">
                            <a href="#" className="hover:underline">
                                LOKASI BCA
                            </a>
                            <a href="#" className="hover:underline">
                                INFORMASI KURS
                            </a>
                            <a href="#" className="hover:underline">
                                MEDIA SOSIAL
                            </a>
                        </div> */}
				<p>© {momentId().format("Y")} YKKA, All Rights Reserved. &nbsp;</p>
			</div>
		</>
	);
};

export default Footer;
