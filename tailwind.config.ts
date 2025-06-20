import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const tailwindsConfig: Config = {
	content: ["{routes,islands,components}/**/*.{ts,tsx}"],
	plugins: [forms],
};

export default tailwindsConfig;
