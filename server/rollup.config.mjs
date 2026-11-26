import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { isAbsolute } from 'node:path';

const aliases = ['@apis', '@cache', '@controllers', '@entityMappers', '@services'];

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
        sourcemap: false,
    },
    external: (id) =>
        !isAbsolute(id) &&
        !id.startsWith('.') &&
        !aliases.some((alias) => id === alias || id.startsWith(`${alias}/`)),
    plugins: [
        nodeResolve({ extensions: ['.mjs', '.js', '.json', '.node', '.ts'] }),
        typescript({ compilerOptions: { module: 'ESNext', moduleResolution: 'Bundler' } }),
    ],
};
