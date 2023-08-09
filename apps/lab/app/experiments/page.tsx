import { getMetadata } from "@/helpers/metadata";
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

export const metadata: Metadata = getMetadata({
  prefixTitle: "Experiments",
  suffixUrl: "experiments",
});
