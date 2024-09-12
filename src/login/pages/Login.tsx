import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Link, TextField } from "@mui/material";
import PasswordToggle from "../PasswordToggle";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

	const { kcClsx } = getKcClsx({
		doUseDefaultCss,
		classes
	});

	const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

	const { msg, msgStr } = i18n;

	const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<Template
			kcContext={kcContext}
			i18n={i18n}
			doUseDefaultCss={doUseDefaultCss}
			classes={classes}
			displayMessage={!messagesPerField.existsError("username", "password")}
			headerNode={msg("loginAccountTitle")}
			displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
			infoNode={
				<>
					{msg("noAccount")}{" "}
					<Link color="secondary" tabIndex={8} href={url.registrationUrl}>
						{msg("doRegister")}
					</Link>
				</>
			}
			socialProvidersNode={
				<>
					{realm.password && social?.providers?.length && (
						<div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
							<hr />
							<h2>{msg("identity-provider-login-label")}</h2>
							<ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
								{social.providers.map((...[p, , providers]) => (
									<li key={p.alias}>
										<a
											id={`social-${p.alias}`}
											className={kcClsx(
												"kcFormSocialAccountListButtonClass",
												providers.length > 3 && "kcFormSocialAccountGridItem"
											)}
											type="button"
											href={p.loginUrl}
										>
											{p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
											<span
												className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
												dangerouslySetInnerHTML={{ __html: p.displayName }}
											></span>
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</>
			}
		>
			{realm.password && (
				<form
					id="kc-form-login"
					onSubmit={() => {
						setIsLoginButtonDisabled(true);
						return true;
					}}
					action={url.loginAction}
					method="post"
				>
					<Grid container direction="column" spacing={2}>
						{!usernameHidden && (
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
										defaultValue={login.username ?? ""}
										type="text"
										autoFocus
										fullWidth
										error={messagesPerField.existsError("username", "password")}
										helperText={messagesPerField.getFirstError("username", "password")}
										className={kcClsx("kcInputErrorMessageClass")}
									/>
								</FormGroup>
							</Grid>
						)}
						<Grid item>
							<FormGroup>
								<TextField
									id="password"
									name="password"
									tabIndex={3}
									label={msg("password")}
									variant="outlined"
									type={passwordVisible ? "text" : "password"}
									InputProps={{
										endAdornment: (
											<PasswordToggle
												passwordVisible={passwordVisible}
												controls="password"
												setPasswordVisible={setPasswordVisible}
												i18n={i18n}
											/>
										)
									}}
									error={usernameHidden && messagesPerField.existsError("username", "password")}
									fullWidth
								/>
							</FormGroup>
						</Grid>
						<Grid item>
							<FormGroup>
								<input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
								<Button tabIndex={4} disabled={isLoginButtonDisabled} variant="contained" type="submit" color="primary">
									{msgStr("doLogIn")}
								</Button>
							</FormGroup>
						</Grid>
						<Grid item>
							<Grid container alignItems="center">
								{realm.rememberMe && !usernameHidden && (
									<Grid item flex={1}>
										<FormGroup>
											<FormControlLabel
												sx={{
													marginBottom: 0
												}}
												id="rememberMe"
												name="rememberMe"
												tabIndex={5}
												control={<Checkbox defaultChecked={!!login.rememberMe} />}
												label={msgStr("rememberMe")}
											/>
										</FormGroup>
									</Grid>
								)}
								{realm.resetPasswordAllowed && (
									<Grid item flex={1} textAlign="right">
										<Button tabIndex={6} href={url.loginResetCredentialsUrl} color="secondary">
											{msg("doForgotPassword")}
										</Button>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</form>
			)}
		</Template>
	);
}
