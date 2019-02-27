import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

const external = [...Object.keys(pkg.peerDependencies)];

const plugins = [
  typescript({
    include: "index.ts",
    typescript: require("typescript")
  }),
  production && terser()
];

const output = {
  exports: "named",
  globals: {
    react: "React"
  }
};

export default [
  {
    input: "index.ts",
    output: [
      {
        ...output,
        file: pkg.main,
        format: "cjs"
      },
      {
        ...output,
        file: pkg.module,
        format: "es"
      }
    ],
    external,
    plugins
  },
  {
    input: "index.ts",
    output: {
      ...output,
      file: pkg.browser,
      format: "umd",
      name: "useBreakpoint"
    },
    external,
    plugins: [resolve(), commonjs(), ...plugins]
  }
];
