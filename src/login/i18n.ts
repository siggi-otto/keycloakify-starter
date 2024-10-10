import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        de: {
            // With this PR, the message show be included, but for now, it isn't:
            // https://github.com/keycloak/keycloak/pull/28962
            "error-user-attribute-required": "Bitte füllen Sie dieses Feld aus.",
            footer_all_rights_reserved: "All rights reserved",
            footer_author: "Team Siggi",
            footer_copyright: "Copyright ©",
            footer_imprint: "Impressum",
            footer_privacy: "Datenschutz"
        },
        en: {
            // Needs to be redeclared, otherwhise TypeScript keeps complaining,
            // because resource is declared in the `de`-block.
            "error-user-attribute-required": "Please specify this field.",
            footer_all_rights_reserved: "All rights reserved",
            footer_author: "Team Siggi",
            footer_copyright: "Copyright ©",
            footer_imprint: "Imprint",
            footer_privacy: "Privacy policy"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
