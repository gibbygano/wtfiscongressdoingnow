import { type Config } from "tailwindcss";
import typography from "npm:@tailwindcss/typography";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    typography,
  ],
} satisfies Config;
