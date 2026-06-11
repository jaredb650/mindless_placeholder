// ============================================================
// EVENTS — the funnel. This is the file you'll edit most.
//
// Upcoming events sort soonest-first automatically. Past events
// sort newest-first. Flip status to "past" after an event runs.
//
// status: "upcoming" | "past" | "soldout"
//   - "soldout" still shows in upcoming, with a red SOLD OUT tag
//     and the ticket button disabled.
//
// date: ISO "YYYY-MM-DD" (+ "THH:MM" to show a time). All times
//   are Puerto Rico local (AST).
//
// type: "techno" | "alt" | "mystery"  → the row tag
// image: flyers live in /public/events/
// ============================================================

export const events = [
    // ── UPCOMING ────────────────────────────────────────────────
    {
        id: "outta-the-grave",
        title: "OUTTA THE GRAVE — RELEASE PARTY",
        subtitle: "WARLORDS album release party — w/ special guests · $10 at the door",
        series: null,
        type: "alt",
        date: "2026-06-19T20:00",
        venue: "La Caverna",
        city: "Santurce, San Juan PR",
        lineup: ["WARLORDS"],
        // tickets at the door for now — swap for a real ticket link if one drops
        ticketUrl: "https://www.instagram.com/warlords.band",
        image: "/events/outta-the-grave.jpg",
        status: "upcoming",
    },
    {
        id: "puro-gruv",
        title: "PURO GRUV",
        subtitle: "???",
        series: null,
        type: "mystery",
        date: "2026-07-17T22:00",
        venue: "Shipwreck Studios",
        city: "???",
        lineup: ["???"],
        ticketUrl: "https://boletos.boletera.net/e/puro-gruv",
        image: "/events/puro-gruv.jpg",
        status: "upcoming",
    },

    // ── PAST (the archive) ──────────────────────────────────────
    {
        id: "dimensions-la-respuesta",
        title: "DIMENSIONS: LA RESPUESTA",
        subtitle: "First international headliner — DJ GOTHQUEEN (NYC), PR debut",
        series: "Dimensions",
        type: "techno",
        date: "2026-06-06T20:00",
        venue: "La Respuesta",
        city: "Santurce, San Juan PR",
        lineup: [
            "DJ GOTHQUEEN (NYC)",
            "GIIIOOO b2b R3M b2b MEKA",
            "XAMORA b2b ANDROMEDA",
            "KAI b2b NOTHUMAN",
        ],
        ticketUrl: null,
        image: "/events/dimensions-la-respuesta.jpg",
        status: "past",
    },
    {
        id: "bmth-party",
        title: "BRING ME THE HORIZON PARTY",
        subtitle: "BMTH tribute night",
        series: null,
        type: "alt",
        date: "2026-04-10T20:00",
        venue: "La Respuesta",
        city: "Santurce, San Juan PR",
        lineup: [],
        ticketUrl: null,
        image: "/events/bmth-party.jpg",
        status: "past",
    },
    {
        id: "nu-skool-spring-break",
        title: "NÜ-SKOOL: SPRING BREAK",
        subtitle: "Nu metal night hosted by BLACKWILL and ANDROMEDA",
        series: "Nü-Skool",
        type: "alt",
        date: "2026-03-27T20:00",
        venue: "El Nie Bar",
        city: "San Juan, PR",
        lineup: ["BLACKWILL", "ANDROMEDA"],
        ticketUrl: null,
        image: "/events/nu-skool-spring-break.jpg",
        status: "past",
    },
    {
        id: "dimensions-la-caverna",
        title: "DIMENSIONS: LA CAVERNA",
        subtitle: "Hard techno in the cave",
        series: "Dimensions",
        type: "techno",
        date: "2026-02-28T20:00",
        venue: "La Caverna",
        city: "Santurce, San Juan PR",
        lineup: ["HYPNOO", "PULSMODIFIKATOR", "GIIIOOO b2b MEKA", "XAMORA b2b ANDROMEDA"],
        ticketUrl: null,
        image: "/events/dimensions-la-caverna.jpg",
        status: "past",
    },
    {
        id: "myscene-metalcore",
        title: "MYSCENE: METALCORE NIGHT",
        subtitle: "Free entry — hosted by BLACKWILL, GIIIOOO & ANDROMEDA",
        series: "Myscene",
        type: "alt",
        date: "2026-02-07T20:00",
        venue: "La Respuesta",
        city: "Santurce, San Juan PR",
        lineup: ["BLACKWILL", "GIIIOOO", "ANDROMEDA"],
        ticketUrl: null,
        image: "/events/myscene-metalcore.jpg",
        status: "past",
    },
];

// ── helpers (don't edit below) ────────────────────────────────

// Dates in this file are Puerto Rico local time (AST, UTC-4 year-round).
// parseEventDate pins them to that offset so they render the same
// everywhere (Vercel's servers run UTC).
export function parseEventDate(iso) {
    if (iso.includes("T")) {
        if (/[Zz]|[+-]\d{2}:?\d{2}$/.test(iso)) return new Date(iso); // explicit zone
        const withSeconds = /T\d{2}:\d{2}$/.test(iso) ? `${iso}:00` : iso;
        return new Date(`${withSeconds}-04:00`);
    }
    return new Date(`${iso}T12:00:00-04:00`);
}

export function upcomingEvents() {
    return events
        .filter((e) => e.status === "upcoming" || e.status === "soldout")
        .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));
}

export function pastEvents() {
    return events
        .filter((e) => e.status === "past")
        .sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));
}

export function nextEvent() {
    return upcomingEvents()[0] ?? null;
}

export function formatEventDate(iso) {
    const hasTime = iso.includes("T");
    const d = parseEventDate(iso);
    const date = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "America/Puerto_Rico",
    });
    if (!hasTime) return date.toUpperCase();
    const time = d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Puerto_Rico",
    });
    return `${date} · ${time}`.toUpperCase();
}
