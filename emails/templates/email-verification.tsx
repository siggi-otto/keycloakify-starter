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
        preview={
            locale === "de"
                ? `Verifizierungs link von Orbidder`
                : `Verification link from Orbidder`
        }
        locale={locale}
    >
        {locale === "de" ? (
            <>
                <Text style={paragraph}>
                    Jemand hat ein Orbidder-Konto mit dieser E-Mail-Adresse erstellt. Wenn
                    dies Sie waren, klicken Sie auf den Link unten, um Ihre E-Mail-Adresse
                    zu bestätigen.
                </Text>
                <Text style={paragraph}>
                    <a href={exp("link")}>Link zur E-Mail-Adressbestätigung</a>
                </Text>
                <Text style={paragraph}>
                    Dieser Link verfällt in{" "}
                    {exp("linkExpirationFormatter(linkExpiration)")}.
                </Text>
                <Text style={paragraph}>
                    Wenn Sie dieses Konto nicht erstellt haben, ignorieren Sie diese
                    Nachricht einfach.
                </Text>
            </>
        ) : (
            <>
                <Text style={paragraph}>
                    Someone has created a Orbidder account with this email address. If
                    this was you, click the link below to verify your email address
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
