import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Row,
    Section
} from "jsx-email";
import React, { PropsWithChildren, ReactNode } from "react";

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    marginBottom: "64px",
    padding: "30px 0 20px"
};

const box = {
    padding: "0 48px"
};

const baseUrl = import.meta.isJsxEmailPreview ? "/assets" : "${url.resourcesUrl}";

export const EmailLayout = ({
    locale,
    children,
    preview
}: PropsWithChildren<{ preview: ReactNode; locale: string }>) => {
    return (
        <Html lang={locale}>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`${baseUrl}/orbidder-skylab.png`}
                        width="300"
                        height="60"
                        style={{ marginBottom: "10px" }}
                    />
                    <Section style={box}>{children}</Section>
                </Container>
            </Body>
        </Html>
    );
};
