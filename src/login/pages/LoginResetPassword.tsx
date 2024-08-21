import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, FormGroup, Grid, TextField } from "@mui/material";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

	const { kcClsx } = getKcClsx({
		doUseDefaultCss,
		classes
	});

	const { url, realm, auth, messagesPerField } = kcContext;

	const { msg, msgStr } = i18n;

	return (
		<Template
			kcContext={kcContext}
			i18n={i18n}
			doUseDefaultCss={doUseDefaultCss}
			classes={classes}
			displayInfo
			displayMessage={!messagesPerField.existsError("username")}
			infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
			headerNode={msg("emailForgotTitle")}
		>
			<form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<FormGroup>
							<TextField
								label={
									!realm.loginWithEmailAllowed
										? msg("username")
										: !realm.registrationEmailAsUsername
											? msg("usernameOrEmail")
											: msg("email")
								}
								tabIndex={2}
								id="username"
								name="username"
								defaultValue={auth.attemptedUsername ?? ""}
								type="text"
								autoFocus
								fullWidth
								error={messagesPerField.existsError("username")}
								helperText={messagesPerField.get("username")}
								className={kcClsx("kcInputErrorMessageClass")}
							/>
						</FormGroup>
					</Grid>
					<Grid item>
						<Grid container>
							<Grid item flex={1}>
								<Button color="secondary" href={url.loginUrl}>
									{msg("backToLogin")}
								</Button>
							</Grid>
							<Grid item flex={1} textAlign="right">
								<Button variant="contained" type="submit" color="primary">
									{msgStr("doSubmit")}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Template>
	);
}
