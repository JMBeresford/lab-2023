import { Metadata } from "next";

const name = "John Beresford";
const title = "Lab - John Beresford";
const url = "https://lab.john-beresford.com";
const description = "Byte-sized computer graphics and web experiments created by John Beresford.";
const imageUrl = "https://lab.john-beresford.com/og-image.jpg";

export const defaultMetadata: Metadata = {
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
  },
};
