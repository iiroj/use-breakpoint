import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

const external = [...Object.keys(pkg.peerDependencies)];

const getPlugins = (target, declaration) => {
  const tsOptions = {
    sourceMap: false,
    tsconfig: "tsconfig.build.json",
    typescript: require("typescript"),
    target,
  };

  if (declaration) {
    tsOptions.declaration = true;
    tsOptions.outDir = ".";
  }

  return [resolve(), commonjs(), typescript(tsOptions)];
};

export default [
  {
    input: "index.ts",
    output: { exports: "named", dir: ".", format: "cjs" },
    external,
    plugins: getPlugins("es5", true),
  },
  {
    input: "index.ts",
    output: { exports: "named", file: pkg.module, format: "esm" },
    external,
    plugins: getPlugins("es2015"),
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
    plugins: getPlugins("es5"),
  },
];
