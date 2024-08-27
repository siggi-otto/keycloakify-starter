import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
	// Keep this resources in sync with skylab.
	en: {
		footer_all_rights_reserved: "All rights reserved",
		footer_author: "Team Siggi",
		footer_copyright: "Copyright ©",
		footer_imprint: "Imprint",
		footer_privacy: "Privacy policy"
	},
	de: {
		footer_all_rights_reserved: "All rights reserved",
		footer_author: "Team Siggi",
		footer_copyright: "Copyright ©",
		footer_imprint: "Impressum",
		footer_privacy: "Datenschutz"
	}
});

export type I18n = typeof ofTypeI18n;
