import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const appDirectory = import.meta.dirname;

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
        base: isProduction ? env.VITE_APP_BASE_PATH || '/' : '/tv-app',
        resolve: {
            alias: [
                { find: '@services', replacement: resolve(appDirectory, './src/services') },
                { find: '@hooks', replacement: resolve(appDirectory, './src/hooks') },
                { find: '@pages', replacement: resolve(appDirectory, './src/pages') },
                { find: '@configuration', replacement: resolve(appDirectory, './src/configuration') },
                { find: '@app-types', replacement: resolve(appDirectory, './src/types') },
                { find: '@components', replacement: resolve(appDirectory, './src/components') },
                { find: '@assets', replacement: resolve(appDirectory, './src/assets') },
                { find: '@layout', replacement: resolve(appDirectory, './src/layout') },
                { find: '@routes', replacement: resolve(appDirectory, './src/routes') },
            ],
        },
    };
});
