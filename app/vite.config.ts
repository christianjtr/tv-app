import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return {
        plugins: [
            react({
                babel: {
                    plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
                },
            }),
        ],
        mode,
        server: {
            host: true,
            port: +JSON.stringify(env.VITE_APP_SERVER_PORT)! || 3000,
        },
        define: {
            ...Object.keys(env).reduce(
                (prev, key): Record<PropertyKey, string> => {
                    prev[`process.env.${key}`] = JSON.stringify(env[key]);
                    return prev;
                },
                {} as Record<PropertyKey, string>
            ),
        },
        base: isProduction ? '/' : '/tv-app',
        resolve: {
            alias: [
                { find: '@services', replacement: resolve(__dirname, './src/services') },
                { find: '@hooks', replacement: resolve(__dirname, './src/hooks') },
                { find: '@pages', replacement: resolve(__dirname, './src/pages') },
                { find: '@configuration', replacement: resolve(__dirname, './src/configuration') },
                { find: '@app-types', replacement: resolve(__dirname, './src/types') },
                { find: '@components', replacement: resolve(__dirname, './src/components') },
                { find: '@assets', replacement: resolve(__dirname, './src/assets') },
                { find: '@layout', replacement: resolve(__dirname, './src/layout') },
                { find: '@routes', replacement: resolve(__dirname, './src/routes') },
            ],
        },
    };
});
