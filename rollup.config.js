import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";


const extensions = [".js", ".ts"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/ua-parser-51d.js",
      format: "cjs",
      plugins: [],
    },
    {
      file: "lib/ua-parser-51d.min.js",
      format: "cjs",
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      include: ["src/**/*.ts"],
      extensions,
      exclude: [
        "./src/**/*.spec.ts",
        "./src/config.ts",
        "./src/__tests__",
        "./src/__pages__",
        "./src/__mocks__",
      ],
    }),
  ],
};
