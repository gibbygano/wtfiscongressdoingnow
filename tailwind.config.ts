import { type Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

const tailwindsConfig: Config = {
	content: [
		"{routes,islands,components}/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			screens: {
				"3xl": "2560px",
			},
		},
	},
	plugins: [forms, typography],
};

export default tailwindsConfig;
