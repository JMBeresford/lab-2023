import { SceneRoot } from "@/helpers/SceneRoot";
import { Nav } from "../src/components/Nav";
import styles from "./layout.module.scss";
import { Debug } from "@/components/Debug";
import { Suspense } from "react";
import { ScenePortal } from "@/helpers/ScenePortal";
import { HomeScene } from "@/scenes/HomeScene";
import { LoadScreen } from "@/components/LoadScreen";
import { Analytics } from "@/utils/ga";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Analytics />
        <SceneRoot>
          <Suspense fallback={null}>
            <LoadScreen />
            <div className={styles.layout}>
              <Nav />
              {children}
            </div>
          </Suspense>
        </SceneRoot>

        <ScenePortal>
          <HomeScene />
        </ScenePortal>

        <Suspense fallback={null}>
          <Debug />
        </Suspense>
      </body>
    </html>
  );
}
