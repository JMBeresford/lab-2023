import { getMetadata } from "@/helpers/metadata";
import { ExperimentData } from "experiment-data";
import dynamic from "next/dynamic";
import { SourceButton } from "./SourceButton";

const ExperimentFrame = dynamic(() => import("./ExperimentFrame"), { ssr: false });

type Props = {
  params: {
    experiment: string;
  };
};

export default function Page({ params }: Props) {
  const datum = Object.values(ExperimentData).find((e) => e.pathName === params.experiment);

  if (!datum) return null;

  return (
    <>
      <SourceButton experiment={datum?.name} />
      <ExperimentFrame experiment={params.experiment} />
    </>
  );
}

export async function generateStaticParams() {
  const experiments = Object.values(ExperimentData).map((e) => e.pathName);

  return experiments.map((experiment) => ({
    params: {
      experiment,
    },
  }));
}

export async function generateMetadata({ params }: Props) {
  const experimentDatum = Object.values(ExperimentData).find(
    (e) => e.pathName === params.experiment,
  );

  if (!experimentDatum) return getMetadata({});

  return getMetadata({
    prefixTitle: experimentDatum.label,
    suffixUrl: `experiments/${experimentDatum.pathName}`,
  });
}
