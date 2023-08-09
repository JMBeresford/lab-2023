import { Metadata } from "next";

const name = "John Beresford";
const title = "Lab - John Beresford";
const url = "https://lab.john-beresford.com";
const description = "Byte-sized computer graphics and web experiments created by John Beresford.";
const imageUrl = "https://lab.john-beresford.com/og-image.jpg";

const defaultMetadata: Metadata = {
  title,
  description,
  authors: [{ name, url }],
  keywords: ["computer graphics", "web", "design", "experiments", "john beresford"],
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [imageUrl],
    siteName: title,
  },
  twitter: {
    creator: "@__jberesford__",
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
    site: "@__jberesford__",
  },
};

export const getMetadata = (metadata: {
  prefixTitle?: string;
  suffixUrl?: string;
  description?: string;
  imageUrl?: string;
}): Metadata => ({
  ...defaultMetadata,
  title: metadata.prefixTitle ? `${metadata.prefixTitle} | ${title}` : title,
  description: metadata.description || description,
  openGraph: {
    ...defaultMetadata.openGraph,
    url: metadata.suffixUrl ? `${url}/${metadata.suffixUrl}` : url,
    title: metadata.prefixTitle ? `${metadata.prefixTitle} | ${title}` : title,
    description: metadata.description || description,
    images: [metadata.imageUrl || imageUrl],
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: metadata.prefixTitle ? `${metadata.prefixTitle} | ${title}` : title,
    description: metadata.description || description,
    images: [metadata.imageUrl || imageUrl],
  },
});
