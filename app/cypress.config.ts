import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env_e2e = dotenv.config({ path: '.env.e2e' }).parsed;

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on(
                'file:preprocessor',
                vitePreprocessor({
                    configFile: path.resolve(__dirname, './vite.config.ts'),
                    mode: 'e2e',
                })
            );

            config.env = {
                ...config.env,
                ...env_e2e,
            };

            return config;
        },
    },
});
