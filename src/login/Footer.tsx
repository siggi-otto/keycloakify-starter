import { Link, List, ListItem, Typography } from "@mui/material";

interface FooterProps {
	// Use basic translation interface without placement subsitution
	// to make this component usable in skylab and KeyCloak.
	translate: (key: string) => string;
}

export default function Footer({ translate }: FooterProps) {
	return (
		<Typography
			component="div"
			align="center"
			color="textSecondary"
			variant="caption"
		>
			<List
				sx={{
					"& li": { display: "inline", padding: "0" },
					"& a": { textDecoration: "none" },
					"li:not(:last-child)::after": {
						content: '"・"',
						margin: "0 5px",
						verticalAlign: "middle"
					}
				}}
			>
				<ListItem>
					{translate("footer_copyright")} {new Date().getFullYear()}{" "}
					{translate("footer_author")}{" "}
				</ListItem>
				<ListItem>{translate("footer_all_rights_reserved")}</ListItem>
				<ListItem>
					<FooterLink
						href="https://www.otto.de/shoppages/service/datenschutz"
						text="footer_privacy"
						translate={translate}
					/>
				</ListItem>
				<ListItem>
					<FooterLink
						href="https://www.otto.de/shoppages/service/impressum"
						text="footer_imprint"
						translate={translate}
					/>
				</ListItem>
			</List>
		</Typography>
	);
}

interface FooterLinkProps extends FooterProps {
	href: string;
	text: string;
}

function FooterLink({ href, text, translate }: FooterLinkProps): JSX.Element {
	return (
		<Link color="textSecondary" href={href} target="_blank">
			{translate(text)}
		</Link>
	);
}
