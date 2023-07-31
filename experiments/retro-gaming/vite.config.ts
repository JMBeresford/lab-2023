import config from "vite-custom-config/experiment";
import { mergeConfig, defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

const localConfig = defineConfig({
  server: {
    https: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [basicSsl()],
});

export default mergeConfig(config, localConfig, true);
