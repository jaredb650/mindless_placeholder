// ============================================================
// MINDLESS ENTERTAINMENT — site-wide config
// Edit this file to update brand info, socials, and navigation.
// ============================================================

export const site = {
    name: "MINDLESS",
    fullName: "Mindless Entertainment",
    domain: "mindless.pr",
    tagline: "Hard techno. Alt. Punk. Puerto Rico underground.",
    taglineEs: "El underground de Puerto Rico desde el 2023.",
    description:
        "Mindless Entertainment is an underground music collective from San Juan, Puerto Rico — throwing hard techno raves and alternative/punk shows, and documenting the island's scene since 2023.",
    founded: 2023,
    city: "San Juan",
    region: "Puerto Rico",
    // Broadcast chrome — coordinates of San Juan, used as set dressing
    coords: "18.4655°N 66.1057°W",

    email: "gio@mindless.pr",
};

export const socials = [
    {
        label: "Instagram",
        handle: "@mindlessentertainmenttv",
        href: "https://www.instagram.com/mindlessentertainmenttv/",
        primary: true, // main audience channel
    },
    {
        label: "YouTube",
        handle: "@MindlessEntertainmentTV",
        href: "https://www.youtube.com/@MindlessEntertainmentTV",
    },
    {
        label: "TikTok",
        handle: "@mindlessentertainmenttv",
        href: "https://www.tiktok.com/@mindlessentertainmenttv",
    },
    {
        label: "Threads",
        handle: "@mindlessentertainmenttv",
        href: "https://www.threads.com/@mindlessentertainmenttv",
    },
    {
        label: "Facebook",
        handle: "Mindless Entertainment",
        href: "https://www.facebook.com/mestandsformindlessentertainment/",
    },
];

export const nav = [
    { label: "Events", labelEs: "Eventos", href: "/events" },
    { label: "Residents", labelEs: "Residentes", href: "/artists" },
    { label: "Videos", labelEs: "Videos", href: "/videos" },
    { label: "Blog", labelEs: "Blog", href: "/blog" },
    { label: "About", labelEs: "Nosotros", href: "/about" },
    { label: "Contact", labelEs: "Contacto", href: "mailto:gio@mindless.pr", mailto: true },
];
