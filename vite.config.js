import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte({
			emitCss: isProduction,
			preprocess: sveltePreprocess({
				scss: {
					prependData: `@import "${path.resolve(__dirname, './src')}/styles/variables.scss";`
				},
				postcss: {
					plugins: [autoprefixer()]
				}
			}),
			compilerOptions: {
				dev: !isProduction
			},
			hot: !isProduction,
		}),
	],
	server: {
		host: 'localhost',
		port: 5000
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	build: {
		outDir: 'retro-cinema-2022',
		rollupOptions: {
			output: {
				manualChunks: false,
				inlineDynamicImports: true,
				entryFileNames: 'assets/bundle.js',
				assetFileNames: 'assets/bundle.[ext]'
			}
		}
	},
	base: isProduction ? './' : '/'
});
