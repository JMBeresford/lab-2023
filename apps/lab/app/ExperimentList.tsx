import { ExperimentData, ExperimentDatum } from "experiment-data";

function ListEntry({ experiment }: { experiment: ExperimentDatum }) {
  return (
    <li>
      <a href={`/experiments/${experiment.pathName}`}>{experiment.label}</a>
    </li>
  );
}

export function ExperimentList() {
  return (
    <div>
      {Object.values(ExperimentData).map((experiment) => (
        <ListEntry key={experiment.name} experiment={experiment} />
      ))}
    </div>
  );
}
