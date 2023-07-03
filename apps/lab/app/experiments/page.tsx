import { defaultMetadata } from "@/helpers/metadata";
import { ExperimentList } from "../../src/components/ExperimentList";
import { PageWrapper } from "@/components/PageWrapper";
import { Metadata } from "next";

export default function Page() {
  return (
    <PageWrapper>
      <ExperimentList />
    </PageWrapper>
  );
}

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `Experiments | ${defaultMetadata.title}`,
};
