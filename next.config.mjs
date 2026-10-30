import { fileURLToPath } from "node:url";
import path from "node:path";

// static media in /public — cached for a week, then served stale
// while it refreshes in the background
const MEDIA_CACHE = "public, max-age=604800, stale-while-revalidate=2592000";

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: path.dirname(fileURLToPath(import.meta.url)),
    },
    images: {
        // AVIF first, WebP fallback — next/image picks per browser
        formats: ["image/avif", "image/webp"],
    },
    async headers() {
        return [
            {
                // media files only — /events and /artists/<slug> are pages
                source: "/:path*\\.:ext(jpe?g|png|webp|avif|mp4)",
                headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
            },
        ];
    },
};

export default nextConfig;
