import { artists } from "@/data/artists";
import { getAllPosts } from "@/lib/blog";

const BASE = "https://mindless.pr";

// Full sitemap — static pages + every artist file + every article.
export default function sitemap() {
    const now = new Date();

    const staticPages = [
        { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE}/artists`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/videos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ];

    const artistPages = artists.map((a) => ({
        url: `${BASE}/artists/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    const blogPages = getAllPosts().map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: "yearly",
        priority: 0.5,
    }));

    return [...staticPages, ...artistPages, ...blogPages];
}
