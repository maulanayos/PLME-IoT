import { env } from "~/env";

const TITLE = "Please Let Me Eat";
const DESCRIPTION = "Please Let Me Eat";

export const defaultMetadata = {
	title: TITLE,
	description: DESCRIPTION,
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? ""),
	alternates: {
		canonical: new URL(env.NEXT_PUBLIC_APP_URL),
	},
	openGraph: {
		url: new URL(env.NEXT_PUBLIC_APP_URL),
		title: TITLE,
		description: DESCRIPTION,
		siteName: TITLE,
		images: "/og-image.png",
		locale: "id_ID",
		type: "website",
	},
};

export const subtitle = (subTitle: string) => `${subTitle} | ${TITLE}`;
export const subcanonical = (subCanonical: string) =>
	new URL(subCanonical, env.NEXT_PUBLIC_APP_URL).toString();

export const twitterMetadata = {
	title: TITLE,
	description: DESCRIPTION,
	card: "summary_large_image",
	images: "/og-image.png",
};

export const ogMetadata = {
	url: new URL(env.NEXT_PUBLIC_APP_URL),
	title: TITLE,
	description: DESCRIPTION,
	type: "website",
	images: "/og-image.png",
};
