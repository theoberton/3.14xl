import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					access: ['@thirdweb-dev/storage', '@orbs-network/ton-access'],
					tonconnect: ['@tonconnect/ui-react'],
					formik: ['formik', 'yup', 'date-fns'],
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [react(), nodePolyfills(), svgr()],
});
