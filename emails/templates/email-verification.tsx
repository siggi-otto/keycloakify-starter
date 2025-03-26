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
    locale: "de",
    themeName: "skylab"
};

export const templateName = "Email Verification";

const { exp } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={locale === "de" ? `E-Mail verifizieren` : `Verify email`}
        locale={locale}
    >
        {locale === "de" ? (
            <>
                <Text style={paragraph}>
                    Jemand hat ein Orbidder-Konto mit dieser E-Mail-Adresse erstellt.
                    Falls Sie das waren, klicken Sie auf den Link, um die E-Mail-Adresse
                    zu verifizieren.
                </Text>
                <Text style={paragraph}>
                    <a href={exp("link")}>Link zur Bestätigung der E-Mail-Adresse</a>
                </Text>
                <Text style={paragraph}>
                    Der Link ist {exp("linkExpirationFormatter(linkExpiration)")} gültig.
                </Text>
                <Text style={paragraph}>
                    Falls Sie dieses Konto nicht erstellt haben, dann können sie diese
                    Nachricht ignorieren.
                </Text>
            </>
        ) : (
            <>
                <Text style={paragraph}>
                    Someone has created a Orbidder account with this email address. If
                    this was you, click the link below to verify your email address.
                </Text>
                <Text style={paragraph}>
                    <a href={exp("link")}>Link to e-mail address verification</a>
                </Text>
                <Text style={paragraph}>
                    This link will expire within{" "}
                    {exp("linkExpirationFormatter(linkExpiration)")}.
                </Text>
                <Text style={paragraph}>
                    If you didn't create this account, just ignore this message.
                </Text>
            </>
        )}
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async props => {
    return props.locale === "en" ? "Verify email" : "E-Mail verifizieren";
};
