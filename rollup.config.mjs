import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import merge from 'deepmerge';
import {createBasicConfig} from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, [{
    input: './dist/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
        sourcemap: "inline",
    },
    plugins: [
        commonjs(),
        resolve(),
    ]
}])