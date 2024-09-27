import { env } from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const apiProxyTarget = env.APP_HTTP_URL;
const BASE = env.APP_HTTP_PUBLIC;
const APP_ENVIROMENT = env.APP_ENVIRONMENT;

// Determina el modo (desarrollo o producción)
const isProduction = APP_ENVIROMENT?.toLowerCase() === 'production';

// Define la base dependiendo del modo
const baseURL = isProduction ? `${BASE}` : './';

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		'process.env': process.env,
		_WORKLET: false,
		__DEV__: env.DEV,
		global: {},
	},
	plugins: [react()],
	base: baseURL,
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		strictPort: true,
		proxy: {
			'/api': {
				target: apiProxyTarget,
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, '/api'),
			},
		},
	},
	build: {
		outDir: '../backend/public',
		emptyOutDir: true,
		minify: true,
		assetsDir: 'assets',
		cssCodeSplit: false,
		sourcemap: false,
		ssr: false,
		rollupOptions: {
			treeshake: true,
			output: {
				entryFileNames: `assets/index.js`,
				chunkFileNames: `assets/index-chunk.js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
	},
});
