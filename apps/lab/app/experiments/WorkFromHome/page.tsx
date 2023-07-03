import { defaultMetadata } from "@/helpers/metadata";
import { Metadata } from "next";
import { Experiment } from "./Experiment";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `Work From Home - ${defaultMetadata.title}`,
};

export default function Page() {
  return <Experiment />;
}
