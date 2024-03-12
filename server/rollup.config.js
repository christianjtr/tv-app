import rollupTypescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const config = [
    {
        input: 'src/main.ts',
        output: {
            file: './dist/tv-app-server.js',
            format: 'cjs',
            sourcemap: false,
        },
        plugins: [rollupTypescript(), dts()],
    },
];

export default config;
