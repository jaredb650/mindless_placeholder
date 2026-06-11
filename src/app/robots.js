// Search engine directives — index everything, point at the sitemap.
export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://mindless.pr/sitemap.xml",
    };
}
