// Web app manifest — name, theme, and icons for Android/Chrome
// installs and rich link handling.
export default function manifest() {
    return {
        name: "Mindless Entertainment",
        short_name: "MINDLESS.PR",
        description:
            "Hard techno raves and alt/punk shows from San Juan, Puerto Rico. Tickets, residents, and the archive.",
        start_url: "/",
        display: "standalone",
        background_color: "#05050a",
        theme_color: "#05050a",
        icons: [
            {
                src: "/brand/mindlessIcon.png",
                sizes: "500x500",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-tight.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
