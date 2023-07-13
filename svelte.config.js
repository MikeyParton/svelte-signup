import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';
import postcssMixins from 'postcss-mixins';
import postCssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({}),
		preprocess({
			postcss: {
				plugins: [
					postcssMixins({ mixinsDir: path.join('src', 'css', 'mixins') }),
					postCssNested,
					autoprefixer
				]
			}
		})
	],
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: false,
		})
	}
};

export default config;
