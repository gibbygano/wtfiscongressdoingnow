import { defineConfig } from "$fresh/server.ts";
import { freshSEOPlugin } from "https://deno.land/x/fresh_seo@1.0.1/mod.ts";
import manifest from "./fresh.gen.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
	plugins: [tailwind(), freshSEOPlugin(manifest)],
});
