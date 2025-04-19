import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from "@tailwindcss/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			precompress: false,
			env: {
				host: '0.0.0.0',
				port: '3434'
			}
		}),
	}
};

export default config;
