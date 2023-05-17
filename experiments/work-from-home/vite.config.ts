import config from "vite-custom-config/experiment";
import { mergeConfig, defineConfig } from "vite";

const localConfig = defineConfig({});

export default mergeConfig(config, localConfig, true);
