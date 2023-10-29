import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "./twind.config.ts";

export default defineConfig({
	plugins: [twindPlugin(twindConfig)],
});
