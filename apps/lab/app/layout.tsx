import { SceneRoot } from "@/helpers/SceneRoot";
import { Nav } from "../src/components/Nav/Nav";
import styles from "./layout.module.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <SceneRoot>
          <div className={styles.layout}>
            <Nav />
            {children}
          </div>
        </SceneRoot>
      </body>
    </html>
  );
}
