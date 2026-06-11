// ============================================================
// VIDEO ARCHIVE — the proof. Embedded from YouTube.
//
// youtubeId: the 11-character ID from the video URL
//   (youtube.com/watch?v=XXXXXXXXXXX → "XXXXXXXXXXX")
//
// Thumbnails load automatically from YouTube — the player only
// loads when someone hits play, so this page stays fast no
// matter how many videos you add.
// ============================================================

export const videos = [
    {
        id: "dimensions-xamora-andromeda",
        title: "POP REMIXES TRANCE RAVE | XAMORA b2b ANDROMEDA | DIMENSIONS",
        youtubeId: "Vcjce8dn68U",
        date: "2026-03-14",
        description:
            "Pop remixes meet trance at Dimensions — XAMORA back to back with ANDROMEDA in Puerto Rico.",
    },
    {
        id: "critical-hit-monstera",
        title: "CRITICAL HIT PUERTO RICO: MONSTERA",
        youtubeId: "lZ40k2Bj5XU",
        date: "2025-11-05",
        description: "Critical Hit Puerto Rico — Monstera, captured by the Mindless crew.",
    },
    {
        id: "almacen-rave-giiiooo",
        title: "ALMACÉN RAVE 🇵🇷 2025 [GIIIOOO]",
        youtubeId: "Byzu-XwPcSQ",
        date: "2025-09-11",
        description: "GIIIOOO at the Almacén warehouse rave, Puerto Rico 2025.",
    },
    {
        id: "raw-club-night",
        title: "RAW CLUB NIGHT (5 HOUR SET) HOUSE TO HARD TECHNO | GIIIOOO X ANDROMEDA",
        youtubeId: "8Ak4DSHQpaM",
        date: "2025-05-03",
        description:
            "Five hours from house to hard techno — GIIIOOO and ANDROMEDA going the distance.",
    },
    {
        id: "third-impact-meka-prettyballads",
        title: "MEKA X PRETTYBALLADS | THIRD IMPACT @EL NIE [HARDGROOVE / TRANCE]",
        youtubeId: "qGlEolzwy4Q",
        date: "2024-11-08",
        description:
            "Hardgroove and trance — MEKA with PRETTYBALLADS at Third Impact, El Nie, Santurce.",
    },
    {
        id: "la-x-interview",
        title: "WHAT IS MINDLESS ENTERTAINMENT? [LA-X 100.7FM INTERVIEW]",
        youtubeId: "WrQnoiwuQdk",
        date: "2024-08-18",
        description:
            "The crew explains what Mindless is — on the radio, La-X 100.7FM.",
    },
    {
        id: "third-impact-giiiooo",
        title: "GIIIO0O | THIRD IMPACT @EL NIE [HARDGROOVE / HARDCORE]",
        youtubeId: "nNEY4hBbqKc",
        date: "2024-08-07",
        description: "GIIIOOO's hardgroove/hardcore set at Third Impact, El Nie, Santurce.",
    },
    {
        id: "third-impact-andromeda",
        title: "ANDROMEDA | THIRD IMPACT @EL NIE [SYNTHWAVE / MIDTEMPO]",
        youtubeId: "W-09P34NHIY",
        date: "2024-07-31",
        description: "ANDROMEDA in synthwave/midtempo mode at Third Impact, El Nie, Santurce.",
    },
    {
        id: "giiiooo-trampolines",
        title: "GIIIO0O — TRAMPOLINES [GROOVE / HARDCORE 150-200BPM]",
        youtubeId: "24BjnPxAXm0",
        date: "2024-06-01",
        description: "Trampolines — GIIIOOO pushing 150–200 BPM groove and hardcore.",
    },
    {
        id: "meka-90s-rave-room",
        title: "90'S STYLE RAVE ROOM | MEKA | (HARD TECHNO/TRANCE) DJ SET",
        youtubeId: "Ho20yUjSEzA",
        date: "2023-12-10",
        description: "MEKA channels the 90s rave room — hard techno and trance.",
    },
];

export function publishedVideos() {
    return videos
        .filter((v) => v.youtubeId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function allVideos() {
    return [...videos].sort((a, b) => new Date(b.date) - new Date(a.date));
}
