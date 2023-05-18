const common = {
  plugins: ["custom"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};

module.exports = {
  configs: {
    next: {
      ...common,
      extends: ["next", "turbo", "prettier"],
      rules: {
        "@next/next/no-html-link-for-pages": "off",
      },
    },
    vite: {
      ...common,
      env: { browser: true, es2020: true },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "turbo",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      plugins: ["react-refresh", "custom"],
      rules: {
        "react-refresh/only-export-components": "warn",
      },
    },
  },
};
