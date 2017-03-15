import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';

export default {
  entry: 'src/index.js',
  dest: 'lib/loadmaster.js',
  moduleName: 'LoadMaster',
  format: 'umd',
  plugins: [
    builtins(),
    nodeResolve({
      jsnext: true,
      browser: true,
    }),
    commonjs(),
    buble()
  ]
};
