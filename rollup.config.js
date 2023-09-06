// rollup.config.mjs
import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
export default {
  input: 'assets/js/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs',
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],
  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      sourceMap: true,
      fileName: 'main.css',
      outputStyle: 'compressed',
    }),
  ],
};
