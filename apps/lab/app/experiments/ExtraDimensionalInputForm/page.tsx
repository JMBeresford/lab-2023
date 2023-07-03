import { defaultMetadata } from "@/helpers/metadata";
import { Metadata } from "next";
import { Experiment } from "./Experiment";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `Extra Dimensional Input Form | ${defaultMetadata.title}`,
};

export default function Page() {
  return <Experiment />;
}
