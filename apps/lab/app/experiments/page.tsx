import { HomeScene } from "@/scenes/HomeScene";
import { ExperimentList } from "../../src/components/ExperimentList";
import { ScenePortal } from "@/helpers/ScenePortal";
import { PageWrapper } from "@/components/PageWrapper";

export default function Page() {
  return (
    <PageWrapper>
      <ExperimentList />

      <ScenePortal>
        <HomeScene />
      </ScenePortal>
    </PageWrapper>
  );
}
