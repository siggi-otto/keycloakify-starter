import { Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import React from "react";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "skylab"
};

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={locale === "de" ? `Passwort zurücksetzen` : `Reset password`}
        locale={locale}
    >
        {locale === "de" ? (
            <>
                <Text style={paragraph}>
                    Jemand hat soeben angefragt, die Zugangsdaten Ihres Orbidder-Kontos zu
                    ändern. Wenn dies Sie waren, klicken Sie auf den Link unten, um diese
                    zurückzusetzen.
                </Text>
                <Text style={paragraph}>
                    <a href={exp("link")}>Link zum Zurücksetzen der Zugangsdaten</a>
                </Text>
                <Text style={paragraph}>
                    Dieser Link verfällt in{" "}
                    {exp("linkExpirationFormatter(linkExpiration)")}.
                </Text>
                <Text style={paragraph}>
                    Wenn Sie Ihre Zugangsdaten nicht zurücksetzen möchten, ignorieren Sie
                    diese Nachricht einfach und es wird nichts geändert.
                </Text>
            </>
        ) : (
            <>
                <Text style={paragraph}>
                    Someone just requested to change your Orbidder account's credentials.
                    If this was you, click on the link below to reset them.
                </Text>
                <Text style={paragraph}>
                    <a href={exp("link")}>Link to reset credentials</a>
                </Text>
                <Text style={paragraph}>
                    This link will expire within{" "}
                    {exp("linkExpirationFormatter(linkExpiration)")}.
                </Text>
                <Text style={paragraph}>
                    If you don't want to reset your credentials, just ignore this message
                    and nothing will be changed.
                </Text>
            </>
        )}
    </EmailLayout>
);
export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async props => {
    return props.locale === "de" ? "Passwort zurücksetzen" : "Reset password";
};
