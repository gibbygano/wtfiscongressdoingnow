import { defineConfig } from "$fresh/server.ts";
import { freshSEOPlugin } from "https://deno.land/x/fresh_seo@1.0.1/mod.ts";
import manifest from "./fresh.gen.ts";
import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "./twind.config.ts";

export default defineConfig({
	plugins: [twindPlugin(twindConfig), freshSEOPlugin(manifest)],
});
