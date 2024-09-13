import { useState } from "react";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid2, TextField } from "@mui/material";
import PasswordToggle from "./../PasswordToggle";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    const [passwordVisibleNew, setPasswordVisibleNew] = useState(false);
    const [passwordVisibleConfirm, setPasswordVisibleConfirm] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <Grid2 container spacing={2} direction="column">
                    <Grid2>
                        <FormGroup>
                            <TextField
                                id="password-new"
                                name="password-new"
                                tabIndex={3}
                                label={msg("passwordNew")}
                                variant="outlined"
                                type={passwordVisibleNew ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <PasswordToggle
                                            passwordVisible={passwordVisibleNew}
                                            controls="password"
                                            setPasswordVisible={setPasswordVisibleNew}
                                            i18n={i18n}
                                        />
                                    )
                                }}
                                error={messagesPerField.existsError("password", "password-confirm")}
                                helperText={messagesPerField.getFirstError("password")}
                                className={kcClsx("kcInputErrorMessageClass")}
                                fullWidth
                            />
                        </FormGroup>
                    </Grid2>
                    <Grid2>
                        <FormGroup>
                            <TextField
                                id="password-confirm"
                                name="password-confirm"
                                tabIndex={3}
                                label={msg("passwordConfirm")}
                                variant="outlined"
                                type={passwordVisibleConfirm ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <PasswordToggle
                                            passwordVisible={passwordVisibleConfirm}
                                            controls="password"
                                            setPasswordVisible={setPasswordVisibleConfirm}
                                            i18n={i18n}
                                        />
                                    )
                                }}
                                error={messagesPerField.existsError("password", "password-confirm")}
                                helperText={messagesPerField.getFirstError("password-confirm")}
                                className={kcClsx("kcInputErrorMessageClass")}
                                fullWidth
                            />
                        </FormGroup>
                    </Grid2>
                    <Grid2>
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    </Grid2>
                    <Grid2>
                        <Grid2 container>
                            <Grid2 flex={1}>
                                {isAppInitiatedAction && (
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="info"
                                        name="cancel-aia"
                                        formNoValidate
                                    >
                                        {msgStr("doCancel")}
                                    </Button>
                                )}
                            </Grid2>
                            <Grid2 flex={1} textAlign="right">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                >
                                    {msgStr("doSubmit")}
                                </Button>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <Grid2 flex={1}>
            <FormGroup>
                <FormControlLabel
                    sx={{
                        marginBottom: 0
                    }}
                    id="logout-sessions"
                    name="logout-sessions"
                    tabIndex={5}
                    control={<Checkbox defaultChecked={true} />}
                    label={msg("logoutOtherSessions")}
                />
            </FormGroup>
        </Grid2>
    );
}
