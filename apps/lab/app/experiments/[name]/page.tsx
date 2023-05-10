import { type Experiment, ExperimentData } from "experiment-data";
import { ExperimentFrame } from "../../../components/ExperimentFrame";

export default function Page({ params }: { params: { name: Experiment } }) {
  const experiment = ExperimentData[params.name];
  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${experiment.devPort}`
      : experiment.liveUrl;

  return <ExperimentFrame src={url} />;
}
