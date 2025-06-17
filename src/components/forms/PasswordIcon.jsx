import { useState } from "react";
import MuiIcon from "@components/MuiIcon";

export default function PasswordIcon() {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);

		const input = document.querySelector('input[type="password"], input[type="text"]');
		if (input) {
			input.type = visible ? "password" : "text";
		}
	};
	return (
		<>
			{visible ? (
				<MuiIcon onClick={toggleVisibility} iconName="visibility_off" />
			) : (
				<MuiIcon onClick={toggleVisibility} iconName="visibility" />
			)}
		</>
	);
}
