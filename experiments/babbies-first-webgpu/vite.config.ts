import config from "vite-custom-config/experiment-vanilla";
import { mergeConfig, defineConfig } from "vite";

const localConfig = defineConfig({});

export default mergeConfig(config, localConfig, true);
