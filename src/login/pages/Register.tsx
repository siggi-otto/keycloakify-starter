import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Link } from "@mui/material";
import "./register.css";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
	UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
	doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
	const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

	const { kcClsx } = getKcClsx({
		doUseDefaultCss,
		classes
	});

	const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey, termsAcceptanceRequired } = kcContext;

	const { msg, msgStr } = i18n;

	const [isFormSubmittable, setIsFormSubmittable] = useState(false);
	const [areTermsAccepted, setAreTermsAccepted] = useState(false);

	return (
		<Template
			kcContext={kcContext}
			i18n={i18n}
			doUseDefaultCss={doUseDefaultCss}
			classes={classes}
			headerNode={msg("registerTitle")}
			displayMessage={messagesPerField.exists("global")}
			displayRequiredFields
		>
			<form id="kc-register-form" className={kcClsx("kcFormClass")} action={url.registrationAction} method="post">
				<Grid container spacing={2} direction="column">
					<Grid item>
						<UserProfileFormFields
							kcContext={kcContext}
							i18n={i18n}
							kcClsx={kcClsx}
							onIsFormSubmittableValueChange={setIsFormSubmittable}
							doMakeUserConfirmPassword={doMakeUserConfirmPassword}
						/>
					</Grid>
					{termsAcceptanceRequired && (
						<Grid typography="body1" item>
							<TermsAcceptance
								i18n={i18n}
								kcClsx={kcClsx}
								messagesPerField={messagesPerField}
								areTermsAccepted={areTermsAccepted}
								onAreTermsAcceptedValueChange={setAreTermsAccepted}
							/>
						</Grid>
					)}
					{recaptchaRequired && (
						<Grid item>
							<div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
						</Grid>
					)}
					<Grid item>
						<Grid container>
							<Grid item flex={1}>
								<Button color="secondary" href={url.loginUrl}>
									{msg("backToLogin")}
								</Button>
							</Grid>
							<Grid item flex={1} textAlign="right">
								<Button
									disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
									variant="contained"
									type="submit"
									color="primary"
								>
									{msgStr("doRegister")}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Template>
	);
}

function TermsAcceptance(props: {
	i18n: I18n;
	kcClsx: KcClsx;
	messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
	areTermsAccepted: boolean;
	onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
	const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

	const { msg } = i18n;

	return (
		<>
			<FormGroup>
				{msg("termsTitle")}
				<div id="kc-registration-terms-text">{msg("termsText")}</div>
			</FormGroup>
			<FormGroup>
				<FormControl error={true || messagesPerField.existsError("termsAccepted")}>
					<FormControlLabel
						id="termsAccepted"
						name="termsAccepted"
						control={<Checkbox onChange={e => onAreTermsAcceptedValueChange(e.target.checked)} defaultChecked={areTermsAccepted} />}
						label={msg("acceptTerms")}
					/>
					{messagesPerField.existsError("termsAccepted") && <FormHelperText>You can display an error</FormHelperText>}
				</FormControl>
			</FormGroup>
		</>
	);
}
