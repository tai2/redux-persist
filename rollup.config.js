import pluginNodeResolve from "@rollup/plugin-node-resolve"
import pluginCommonjs from "@rollup/plugin-commonjs"
import pluginTypescript from "@rollup/plugin-typescript"
import { babel as pluginBabel } from "@rollup/plugin-babel"
import { terser as pluginTerser } from "rollup-plugin-terser"
import multi from '@rollup/plugin-multi-entry'

const moduleName = 'ReduxPersist'

import * as path from 'path'

import pkg from "./package.json"

const banner = `/*!
  ${moduleName}.js v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`;

const config = [
  // browser
  // es module
  {
    // entry point
    input: 'src/**/*.ts',
    output: [
      {
        file: pkg.main,
        format: "es",
        sourcemap: "inline",
        banner,
        exports: "named"
      },
    ],
    external: [
      ...Object.keys(pkg.devDependencies || {}),
      'react'
    ],
    plugins: [
      multi(),
      pluginTypescript({
        module: "esnext"
      }),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js")
      }),
    ]
  },
];

export default config

