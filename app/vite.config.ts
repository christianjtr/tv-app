import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    envDir: './environment',
    base: '/tv-app',
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, './src/') },
            { find: '@services', replacement: resolve(__dirname, './src/services') },
            { find: '@hooks', replacement: resolve(__dirname, './src/hooks') },
            { find: '@pages', replacement: resolve(__dirname, './src/pages') },
            { find: '@config', replacement: resolve(__dirname, './src/config') },
            { find: '@app-types', replacement: resolve(__dirname, './src/types') },
            { find: '@components', replacement: resolve(__dirname, './src/components') },
            { find: '@assets', replacement: resolve(__dirname, './src/assets') },
            { find: '@layout', replacement: resolve(__dirname, './src/layout') },
        ],
    },
});
