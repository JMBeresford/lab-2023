import { ExperimentData, ExperimentDatum } from "experiment-data";
import Link from "next/link";

function ListEntry({ experiment }: { experiment: ExperimentDatum }) {
  return (
    <li>
      <Link href={`/experiments/${experiment.pathName}`} prefetch={false}>
        {experiment.label}
      </Link>
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
