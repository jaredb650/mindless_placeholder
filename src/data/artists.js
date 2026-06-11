// ============================================================
// RESIDENT ARTISTS — the roster. Exactly the residents, in
// order. Guest DJs who play our shows live in event lineups,
// NOT here.
//
// type: "dj" | "punk" | "alt" — the CLASS tag
// status: shown on the character card (FOUNDER / ACTIVE RESIDENT)
// tagline: the short bio on the select-screen card
// story: long-form bio for /artists/[slug] — each item = paragraph
// image: portraits live in /public/artists/
// ============================================================

export const artists = [
    {
        slug: "giiiooo",
        name: "GIIIOOO",
        role: "Founder / DJ",
        type: "dj",
        status: "FOUNDER",
        genres: ["Hard Techno"],
        tagline: "Mindless founder and co-creator of “GUAYOTEO”.",
        story: [
            "GIIIOOO is the founder of Mindless Entertainment — the underground collective that has been throwing hard techno raves and alt/punk shows across Puerto Rico since 2023, and the engine behind Dimensions, its flagship hard techno series.",
            "Behind the decks he runs from hardgroove into hardcore, pushing 150–200 BPM sets at shows like Third Impact at El Nie and marathon runs like a five-hour house-to-hard-techno night with ANDROMEDA. Alongside MEKA he co-created “GUAYOTEO”, an original track debuted on a Mindless floor.",
            "From warehouse raves to Dimensions headline nights at La Respuesta and La Caverna, if Mindless built it, GIIIOOO was in the room.",
        ],
        image: "/photos/gallery/crowd-05.jpg",
        socials: {
            instagram: "https://www.instagram.com/giomusic.pr/",
            youtube: "https://www.youtube.com/@GIIIOOOmusic",
        },
    },
    {
        slug: "blackwill",
        name: "BLACKWILL",
        role: "Resident Artist",
        type: "punk",
        status: "ACTIVE RESIDENT + CO-ORGANIZER",
        genres: ["Nu Metal"],
        tagline: "Nu metal artist and co-organizer with Mindless.",
        imagePosition: "center top", // face sits high in the shot
        story: [
            "BLACKWILL is the heavy side of Mindless — a nu metal artist and co-organizer who carries the collective's alt, punk, and metal lane.",
            "He hosts and builds the noise-forward nights: Nü-Skool, the nu metal party he runs with ANDROMEDA at El Nie Bar, and Myscene, the metalcore night at La Respuesta. Real amps, real pits, no playlists.",
            "Where the techno residents bring the strobes, BLACKWILL brings the breakdowns.",
        ],
        image: "/artists/blackwill.jpg",
        socials: {},
    },
    {
        slug: "meka",
        name: "MEKA",
        role: "Resident DJ / Producer",
        type: "dj",
        status: "ACTIVE RESIDENT",
        genres: ["Hard Trance", "Hard Techno"],
        tagline: "Trance and techno producer and DJ. Co-creator of “GUAYOTEO”.",
        story: [
            "MEKA is a California-born, Puerto Rico-based independent artist making maximalist, high-BPM electronic music that draws from hard trance, hardcore, psytrance, and techno without fully belonging to any one of them. His sound is built from fast arpeggiated supersaws, dirty 303s, and chest-thumping kicks pushed to 170 BPM and beyond: melodic but never soft, dramatic but never sentimental, aggressive but never hostile.",
            "With over 130 releases across four years, MEKA has built a prolific underground catalog that includes standout tracks like GOTTAHAVEU<3, BE YOUR ANGEL, and Love Lies Bleeding, as well as collaborations with RL1805, CYNTHESZR, Technopagan, and GIIIOOO. His music has appeared through Berlin's Hardestsoft Records, Montreal's Strawberry Gothcake, and UNDER.NET compilations, surfacing on platforms such as The Lot Radio and HÖR Berlin.",
            "Beyond his releases, MEKA was the creative force behind Shadow Command, a collective that helped catalyze a new wave of DIY rave culture in Puerto Rico. His work is not driven by visibility or approval, but by a deeper conviction that certain sounds and spaces demand to be brought into existence.",
        ],
        image: "/artists/meka.jpg",
        socials: {
            instagram: "https://www.instagram.com/_x.meka.x_/",
        },
    },
    {
        slug: "xamora",
        name: "XAMORA",
        role: "Resident DJ",
        type: "dj",
        status: "ACTIVE RESIDENT",
        genres: ["Hard Trance", "Hard Bounce"],
        tagline: "Hard trance DJ.",
        story: [
            "XAMORA is a Mindless resident working the hard trance and hard bounce end of the spectrum — high-energy, melodic, and built to move a floor.",
            "A regular at Dimensions, she's known for her back-to-backs with ANDROMEDA — including the pop-remixes-meets-trance rave captured on the Mindless channel, and headline slots at Dimensions: La Caverna and the La Respuesta edition alongside the collective's first international headliner.",
        ],
        image: "/artists/xamora.webp",
        socials: {},
    },
    {
        slug: "andromeda",
        name: "ANDROMEDA",
        role: "Resident DJ",
        type: "dj",
        status: "ACTIVE RESIDENT + CO-ORGANIZER",
        genres: ["Hard Techno"],
        tagline: "Hard techno DJ and co-organizer with Mindless.",
        imagePosition: "center top", // face sits high in the shot
        story: [
            "ANDROMEDA is a Mindless resident with one of the widest ranges in the crew — hard techno at the core, but comfortable everywhere from synthwave and midtempo (her Third Impact set at El Nie) to five-hour house-to-hard-techno marathons with GIIIOOO.",
            "She co-hosts Nü-Skool, the nu metal night, with BLACKWILL, and her b2b sets with XAMORA are a Dimensions staple — from La Caverna to La Respuesta.",
        ],
        image: "/artists/andromeda.jpg",
        socials: {},
    },
];

export const artistTypes = [
    { value: "all", label: "ALL" },
    { value: "dj", label: "DJ" },
    { value: "punk", label: "PUNK" },
    { value: "alt", label: "ALT" },
];

export function getArtist(slug) {
    return artists.find((a) => a.slug === slug) ?? null;
}
