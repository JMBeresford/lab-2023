const common = {
  plugins: ["custom"],
};

module.exports = {
  configs: {
    next: {
      ...common,
      extends: [
        "next",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "turbo",
        "prettier",
      ],
      parserOptions: {
        babelOptions: {
          presets: [require.resolve("next/babel")],
        },
      },
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
