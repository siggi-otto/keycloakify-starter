import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
	// Keep `footer_*` resources in sync with skylab.
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
});

export type I18n = typeof ofTypeI18n;
