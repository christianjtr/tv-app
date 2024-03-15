import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const mode = process.env.NODE_ENV || 'development';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    mode,
    server: {
        host: true,
        port: 3000,
    },
    envDir: './environment',
    base: '/tv-app',
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
});
