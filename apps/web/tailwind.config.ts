import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/(public)/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--bg-primary)",
                foreground: "var(--text-primary)",
                "brand-pink": "var(--accent-pink)",
                "brand-purple": "var(--accent-purple)",
                "brand-gold": "var(--accent-gold)",
            },
        },
    },
    plugins: [],
};
export default config;
