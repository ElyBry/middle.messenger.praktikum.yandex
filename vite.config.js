import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: '',
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
        outDir: 'dist',
    },
    plugins: [
        handlebars()
    ],
});
