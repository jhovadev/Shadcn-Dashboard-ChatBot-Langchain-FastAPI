import { env } from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const apiProxyTarget = env.APP_HTTP_URL;
// https://vitejs.dev/config/
export default defineConfig({
	define: {
		'process.env': process.env,
		_WORKLET: false,
		__DEV__: env.DEV,
		global: {},
	},
	plugins: [react()],
	base: '/public/',
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
	},
});
