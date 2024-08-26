import { IconButton, InputAdornment } from "@mui/material";
import { I18n } from "./i18n";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
	controls: string;
	passwordVisible: boolean;
	setPasswordVisible: (val: boolean) => void;
	i18n: I18n;
}

export default function PasswordToggle({
	controls,
	passwordVisible,
	setPasswordVisible,
	i18n
}: Props) {
	return (
		<InputAdornment position="end">
			<IconButton
				aria-label={i18n.msgStr(
					passwordVisible ? "hidePassword" : "showPassword"
				)}
				title={i18n.msgStr(passwordVisible ? "hidePassword" : "showPassword")}
				aria-controls={controls}
				onClick={() => {
					setPasswordVisible(!passwordVisible);
				}}
			>
				{passwordVisible ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	);
}
