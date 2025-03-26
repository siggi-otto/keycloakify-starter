import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Alert, Button, Grid2, List, ListItem, ListItemText } from "@mui/material";

export default function DeleteAccountConfirm(props: PageProps<Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("deleteAccountConfirm")}>
            <form action={url.loginAction} className="form-vertical" method="post">
                <Alert variant="outlined" severity="error">
                    {msg("irreversibleAction")}
                </Alert>

                <Grid2 sx={{ mt: 2 }}>
                    <p>{msg("deletingImplies")}</p>
                </Grid2>
                <List sx={{ p: 0, m: 0 }}>
                    <ListItem sx={{ p: 0, m: 0, ml: 4 }}>
                        <ListItemText secondary={msg("loggingOutImmediately")} />
                    </ListItem>
                    <ListItem sx={{ p: 0, m: 0, ml: 4 }}>
                        <ListItemText secondary={msg("errasingData")} />
                    </ListItem>
                </List>
                <Grid2 sx={{ mt: 2 }}>
                    <p>{msg("finalDeletionConfirmation")}</p>
                </Grid2>
                <Grid2 container sx={{ mt: 4 }}>
                    {triggered_from_aia && (
                        <Grid2 flex={1} textAlign="left">
                            <Button type="submit" value="true" name="cancel-aia" variant="contained" color="inherit">
                                {msgStr("doCancel")}
                            </Button>
                        </Grid2>
                    )}
                    <Grid2 flex={1} textAlign="right">
                        <Button type="submit" variant="contained" color="primary">
                            {msgStr("doConfirmDelete")}
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Template>
    );
}
