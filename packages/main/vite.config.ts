import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import esmodule from 'vite-plugin-esmodule'
import pkg from '../../package.json'
import { join } from "path"

export default defineConfig({
  root: __dirname,
  plugins: [
    esmodule([
      'execa',
    ]),
  ],
  build: {
    outDir: '../../dist/main',
    emptyOutDir: true,
    minify: process.env./* from mode option */NODE_ENV === 'production',
    sourcemap: true,
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
	resolve: {
		alias: {
			'@': join(__dirname, "../renderer"),
			'@@': join(__dirname, "../preload"),
			'@@@': __dirname,
			'@c': join(__dirname, "../common")
		}
	}
})
