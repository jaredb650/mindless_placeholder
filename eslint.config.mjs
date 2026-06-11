import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
    ...nextVitals,
    {
        rules: {
            // this is a vibe-heavy site; <img> + canvas is intentional
            "@next/next/no-img-element": "off",
        },
    },
]);
