import { getMetadata } from "@/helpers/metadata";
import { ExperimentData } from "experiment-data";
import { redirect } from "next/navigation";

type Props = {
  params: {
    experiment: string;
  };
};

export default function Page({ params }: Props) {
  const experimentDatum = Object.values(ExperimentData).find(
    (e) => e.pathName === params.experiment,
  );

  if (!experimentDatum) redirect("/404");

  return <iframe src={`https://${experimentDatum.pathName}.jmberesford.vercel.app`} />;
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
