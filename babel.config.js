const sharedPresets = ["@babel/preset-typescript"];
const shared = {
  ignore: [
    "src/**/*.spec.ts",
    "src/config.ts",
    "src/__tests__",
    "src/__pages__",
    "src/__mocks__",
  ],
  presets: sharedPresets,
};

module.exports = {
  env: {
    esmBundled: {
      ...shared,
      presets: [
        [
          "@babel/env",
          {
            targets: "> 0.25%, not dead",
          },
        ],
        ...sharedPresets,
      ],
    },
  },
};
