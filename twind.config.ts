import { Options } from "twind_fresh_plugin/twind.ts";
import { defineConfig } from "twind";
// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";
import presetTypography from "twind-preset-typography";
import presetLineClamp from "twind-preset-line-clamp";

export default {
	...defineConfig({
		presets: [presetAutoPrefix(), presetTailWind(), presetTypography(), presetLineClamp()],
	}),
	selfURL: import.meta.url,
} as unknown as Options;
