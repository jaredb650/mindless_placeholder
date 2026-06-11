import fs from "fs";
import path from "path";

// Event photography lives in /public/photos/gallery — drop new
// shots in there and they appear automatically.
const GALLERY_DIR = path.join(process.cwd(), "public/photos/gallery");

export function getGalleryImages() {
    if (!fs.existsSync(GALLERY_DIR)) return [];
    return fs
        .readdirSync(GALLERY_DIR)
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort()
        .map((f) => `/photos/gallery/${f}`);
}
