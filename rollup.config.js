import compiler from "@ampproject/rollup-plugin-closure-compiler";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

const external = [...Object.keys(pkg.peerDependencies)];

const getPlugins = (declaration) => {
  const tsOptions = {
    sourceMap: false,
    tsconfig: "tsconfig.build.json",
    typescript: require("typescript"),
  };

  if (declaration) {
    tsOptions.declaration = true;
    tsOptions.outDir = ".";
  }

  return [
    resolve(),
    commonjs(),
    typescript(tsOptions),
    production && compiler(),
  ];
};

export default [
  {
    input: "index.ts",
    output: { exports: "named", dir: ".", format: "cjs" },
    external,
    plugins: getPlugins(true),
  },
  {
    input: "index.ts",
    output: { exports: "named", file: pkg.module, format: "esm" },
    external,
    plugins: getPlugins(),
  },
  {
    input: "index.ts",
    output: {
      exports: "named",
      file: pkg.browser,
      format: "umd",
      globals: {
        react: "React",
      },
      name: "useBreakpoint",
    },
    external,
    plugins: getPlugins(),
  },
];
