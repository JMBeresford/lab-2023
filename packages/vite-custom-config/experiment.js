import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import dts from "vite-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { glslify } from "vite-plugin-glslify";
import viteTsconfig from "tsconfig/vite.json" assert { type: "json" };

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const root = process.platform === "win32" ? path.resolve("/") : "/";

/** @param {string} id */
const external = (id) => !id.startsWith(".") && !id.startsWith(root);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glslify(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      input: "./src/index.ts",
      output: {
        dir: "dist",
        format: "esm",
        preserveModules: true,
      },
      external,
      plugins: [
        commonjs(),
        babel({
          exclude: "node_modules/**",
          extensions,
          babelHelpers: "runtime",
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          plugins: [
            ["@babel/plugin-transform-runtime", { regenerator: false, useESModules: true }],
          ],
        }),
        typescript({ compilerOptions: viteTsconfig.compilerOptions }),
        resolve({ extensions }),
        terser(),
      ],
    },
  },
});
