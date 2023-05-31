import { HomeScene } from "@/scenes/HomeScene";
import { ExperimentList } from "./ExperimentList";
import { ScenePortal } from "@/helpers/ScenePortal";

export default function Page() {
  return (
    <div>
      <ExperimentList />

      <ScenePortal>
        <HomeScene />
      </ScenePortal>
    </div>
  );
}
