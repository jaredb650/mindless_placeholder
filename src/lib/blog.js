import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ============================================================
// BLOG — reads MDX articles from src/content/blog/.
//
// To publish an article: drop a new .mdx file in that folder
// with this frontmatter at the top:
//
//   ---
//   title: "Your headline"
//   date: "2026-06-10"
//   excerpt: "One-line teaser shown on the index."
//   author: "MINDLESS"
//   cover: "/photos/your-image.jpg"   (optional)
//   tag: "Interview"                  (optional: Interview | Recap | Lore | News)
//   ---
//
// then write the article in Markdown below it. Redeploy. Done.
// ============================================================

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts() {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
            const { data, content } = matter(raw);
            return { slug, ...data, content };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
    const file = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    return { slug, ...data, content };
}

export function formatPostDate(iso) {
    // date-only strings parse as UTC midnight — anchor to noon so the
    // day doesn't shift back in Puerto Rico time
    const safe = iso.includes("T") ? iso : `${iso}T12:00:00`;
    return new Date(safe)
        .toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            timeZone: "America/Puerto_Rico",
        })
        .toUpperCase();
}
