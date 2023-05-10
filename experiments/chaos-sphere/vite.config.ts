import { defineConfig } from "vite";
import { glslify } from "vite-plugin-glslify";
import react from "@vitejs/plugin-react-swc";
import { ExperimentData, type Experiment } from "experiment-data";
import packageInfo from "./package.json";

const { devPort } = ExperimentData[packageInfo.name as Experiment];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify()],
  server: {
    port: devPort,
  },
});
