import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			// The leading '#' in "#components" is not standard in Vite alias naming.
			// Typically, aliases start with "@" (e.g., "@components"), but you can also use plain "components".
			"@components": resolve(
				dirname(fileURLToPath(import.meta.url)),
				"components"
			),
			"@constants": resolve(
				dirname(fileURLToPath(import.meta.url)),
				"constants"
			),
			"@store": resolve(dirname(fileURLToPath(import.meta.url)), "store"),
			"@hoc": resolve(dirname(fileURLToPath(import.meta.url)), "hoc"),
			"@windows": resolve(
				dirname(fileURLToPath(import.meta.url)),
				"windows"
			),
		},
	},
});
