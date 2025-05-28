import { useState } from "react";
import MuiIcon from "@components/MuiIcon";

export default function PasswordIcon() {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};
	return (
		<>
			{visible ? (
				<MuiIcon onClick={toggleVisibility} icnoName="visibility_off" />
			) : (
				<MuiIcon onClick={toggleVisibility} icnoName="visibility" />
			)}
		</>
	);
}
