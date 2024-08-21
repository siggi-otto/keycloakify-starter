import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { useInsertLinkTags } from "keycloakify/tools/useInsertLinkTags";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Alert, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, ThemeProvider, Typography, createTheme } from "@mui/material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
	const {
		displayInfo = false,
		displayMessage = true,
		displayRequiredFields = false,
		headerNode,
		socialProvidersNode = null,
		infoNode = null,
		documentTitle,
		bodyClassName,
		kcContext,
		i18n,
		doUseDefaultCss,
		classes,
		children
	} = props;

	const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

	const { msg, msgStr, getChangeLocaleUrl, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

	const { realm, locale, auth, url, message, isAppInitiatedAction, authenticationSession, scripts } = kcContext;

	useEffect(() => {
		document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
	}, []);

	useSetClassName({
		qualifiedName: "html",
		className: kcClsx("kcHtmlClass")
	});

	useSetClassName({
		qualifiedName: "body",
		className: bodyClassName ?? kcClsx("kcBodyClass")
	});

	useEffect(() => {
		const { currentLanguageTag } = locale ?? {};

		if (currentLanguageTag === undefined) {
			return;
		}

		const html = document.querySelector("html");
		assert(html !== null);
		html.lang = currentLanguageTag;
	}, []);

	const { areAllStyleSheetsLoaded } = useInsertLinkTags({
		componentOrHookName: "Template",
		hrefs: !doUseDefaultCss
			? []
			: [
				`${url.resourcesCommonPath}/node_modules/@patternfly/patternfly/patternfly.min.css`,
				`${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
				`${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
				`${url.resourcesCommonPath}/lib/pficon/pficon.css`,
				`${url.resourcesPath}/css/login.css`
			]
	});

	const { insertScriptTags } = useInsertScriptTags({
		componentOrHookName: "Template",
		scriptTags: [
			{
				type: "module",
				src: `${url.resourcesPath}/js/menu-button-links.js`
			},
			...(authenticationSession === undefined
				? []
				: [
					{
						type: "module",
						textContent: [
							`import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";`,
							``,
							`checkCookiesAndSetTimer(`,
							`  "${authenticationSession.authSessionId}",`,
							`  "${authenticationSession.tabId}",`,
							`  "${url.ssoLoginInOtherTabsUrl}"`,
							`);`
						].join("\n")
					} as const
				]),
			...scripts.map(
				script =>
					({
						type: "text/javascript",
						src: script
					}) as const
			)
		]
	});

	useEffect(() => {
		if (areAllStyleSheetsLoaded) {
			insertScriptTags();
		}
	}, [areAllStyleSheetsLoaded]);

	if (!areAllStyleSheetsLoaded) {
		return null;
	}

	const theme = createTheme({
		palette: {
			primary: {
				main: "#f00020"
			},
			secondary: {
				// main: "#1976d2"
				main: "#02B2AF"
			}
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="xl" sx={{ textAlign: "center", p: 2 }}>
				<img src={`${import.meta.env.BASE_URL}img/orbidder-skylab.png`} />
				<Typography variant="h4" color="primary">
					{msg("loginTitleHtml", realm.displayNameHtml)}
				</Typography>
			</Container>
			<Container maxWidth="sm" component={Paper} sx={{ p: 2 }}>
				<Grid container spacing={2} direction="column">
					<Grid item>
						{(() => {
							const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
								<Grid container alignItems="center" spacing={2}>
									<Grid item flex={1}>
										<Typography variant="h6" color="gray">
											{headerNode}
										</Typography>
									</Grid>
									{realm.internationalizationEnabled && (assert(locale !== undefined), locale.supported.length > 1) && (
										<Grid item>
											<FormControl fullWidth>
												<InputLabel id="lang-select-label">{msgStr("languages")}</InputLabel>
												<Select
													size="small"
													labelId="lang-select-label"
													label={msgStr("languages")}
													value={currentLanguageTag}
												>
													{locale.supported.map(({ languageTag }) => (
														<MenuItem
															key={languageTag}
															value={languageTag}
															onClick={() => getChangeLocaleUrl(languageTag)}
														>
															{labelBySupportedLanguageTag[languageTag]}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									)}
								</Grid>
							) : (
								<div id="kc-username" className={kcClsx("kcFormGroupClass")}>
									<label id="kc-attempted-username">{auth.attemptedUsername}</label>
									<a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
										<div className="kc-login-tooltip">
											<i className={kcClsx("kcResetFlowIcon")}></i>
											<span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
										</div>
									</a>
								</div>
							);

							if (displayRequiredFields) {
								return (
									<div className={kcClsx("kcContentWrapperClass")}>
										<div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
											<span className="subtitle">
												<span className="required">*</span>
												{msg("requiredFields")}
											</span>
										</div>
										<div className="col-md-10">{node}</div>
									</div>
								);
							}

							return node;
						})()}
						{/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
						{displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
							<Alert severity={message.type}>
								<span dangerouslySetInnerHTML={{ __html: message.summary }} />
							</Alert>
						)}
					</Grid>
					<Grid item>{children}</Grid>
					{auth !== undefined && auth.showTryAnotherWayLink && (
						<form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
							<div className={kcClsx("kcFormGroupClass")}>
								<div className={kcClsx("kcFormGroupClass")}>
									<input type="hidden" name="tryAnotherWay" value="on" />
									<a
										href="#"
										id="try-another-way"
										onClick={() => {
											document.forms["kc-select-try-another-way-form" as never].submit();
											return false;
										}}
									>
										{msg("doTryAnotherWay")}
									</a>
								</div>
							</div>
						</form>
					)}
					{socialProvidersNode}
					{displayInfo && (
						<Grid item textAlign="center" typography="body2">
							{infoNode}
						</Grid>
					)}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}
