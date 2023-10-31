import { Options } from "twind_fresh_plugin/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import presetTypography from "twind-preset-typography";

export default {
	...defineConfig({
		presets: [presetAutoPrefix(), presetTailWind(), presetTypography()],
		theme: {},
	}),
	selfURL: import.meta.url,
} as unknown as Options;
