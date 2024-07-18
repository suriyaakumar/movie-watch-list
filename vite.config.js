import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		envPrefix: 'VITE_',
	},
	define: {
		'import.meta.env.VITE_OMDB_KEY': JSON.stringify(
			import.meta.env.VITE_OMDB_KEY
		),
	},
	plugins: [react()],
});
