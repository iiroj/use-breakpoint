import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

const external = [...Object.keys(pkg.peerDependencies)]

const getPlugins = (target, declaration) => {
  const tsOptions = {
    declaration: !!declaration,
    declarationDir: declaration ? 'dist' : undefined,
    sourceMap: !!declaration,
    tsconfig: 'src/tsconfig.json',
    typescript: require('typescript'),
    target,
  }

  return [resolve(), commonjs(), typescript(tsOptions)]
}

const config = [
  {
    input: 'src/index.ts',
    output: { exports: 'named', dir: 'dist', format: 'cjs', sourcemap: true },
    external,
    plugins: getPlugins('es5', true),
  },
  {
    input: 'src/index.ts',
    output: { exports: 'named', file: `dist/${pkg.module}`, format: 'esm' },
    external,
    plugins: getPlugins('es2015'),
  },
  {
    input: 'src/index.ts',
    output: {
      exports: 'named',
      file: `dist/${pkg.browser}`,
      format: 'umd',
      globals: {
        react: 'React',
      },
      name: 'useBreakpoint',
    },
    external,
    plugins: getPlugins('es5'),
  },
]

export default config
