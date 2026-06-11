"use client";

import { useEffect, useRef, useState } from "react";
import { formatEventDate, parseEventDate } from "@/data/events";

// stand-in row backdrops until real flyers drop into /public/events
const FALLBACKS = [
    "/photos/gallery/crowd-03.jpg",
    "/photos/gallery/crowd-07.jpg",
    "/photos/gallery/crowd-11.jpg",
    "/photos/gallery/crowd-15.jpg",
];

function eventImage(event, i) {
    return event.image ?? FALLBACKS[i % FALLBACKS.length];
}

/** Live countdown — every upcoming date gets its own clock. */
function Countdown({ date }) {
    const [t, setT] = useState(null);
    useEffect(() => {
        const target = parseEventDate(date).getTime();
        const tick = () => {
            const diff = target - Date.now();
            if (diff <= 0) return setT({ live: true });
            setT({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff % 86400000) / 3600000),
                m: Math.floor((diff % 3600000) / 60000),
                s: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [date]);

    if (!t)
        return (
            <span className="font-mono text-[10px] text-ghost tabular-nums" suppressHydrationWarning>
                --D : --:--:--
            </span>
        );
    if (t.live)
        return (
            <span className="font-mono text-[10px] tracking-[0.2em] text-danger uppercase">
                <span className="blink">●</span> HAPPENING NOW
            </span>
        );
    const pad = (n) => String(n).padStart(2, "0");
    return (
        <span
            className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-ice tabular-nums"
            suppressHydrationWarning
        >
            T-{t.d}D : {pad(t.h)}:{pad(t.m)}:{pad(t.s)}
        </span>
    );
}

/**
 * The schedule — the site's main call to action.
 * Hover a row: the flyer blooms to color and the title glitches.
 * Click the row body: it expands to reveal details.
 * The red TICKETS button is the only thing that navigates.
 */
export default function EventsList({ events, archive = false }) {
    const [hovered, setHovered] = useState(null);
    const [expanded, setExpanded] = useState(null);
    const listRef = useRef(null);

    // no hover on touch — the row crossing the center of the
    // viewport activates instead
    useEffect(() => {
        if (!window.matchMedia("(hover: none)").matches) return;
        const rows = listRef.current?.querySelectorAll("[data-row]");
        if (!rows?.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHovered(Number(entry.target.dataset.row));
                    }
                });
            },
            { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
        );
        rows.forEach((r) => io.observe(r));
        return () => io.disconnect();
    }, [events]);

    return (
        <div ref={listRef}>
            <ul className="border-t border-line">
                {events.map((event, i) => {
                    const soldOut = event.status === "soldout";
                    const past = event.status === "past";
                    const d = parseEventDate(event.date);
                    const day = d.toLocaleDateString("en-US", {
                        day: "2-digit",
                        timeZone: "America/Puerto_Rico",
                    });
                    const month = d
                        .toLocaleDateString("en-US", {
                            month: "short",
                            timeZone: "America/Puerto_Rico",
                        })
                        .toUpperCase();
                    const year = d.toLocaleDateString("en-US", {
                        year: "2-digit",
                        timeZone: "America/Puerto_Rico",
                    });
                    const isHover = hovered === i;
                    const isOpen = expanded === i;

                    const Row = (
                        <article
                            data-row={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => {
                                if (!past) setExpanded(isOpen ? null : i);
                            }}
                            className={`relative overflow-hidden border-b border-line transition-colors ${
                                past ? "opacity-60 hover:opacity-100" : "cursor-pointer"
                            }`}
                        >
                            {/* flyer backdrop — black & white at rest, color when active */}
                            <div aria-hidden="true" className="absolute inset-0">
                                <img
                                    src={eventImage(event, i)}
                                    alt=""
                                    loading="lazy"
                                    className={`w-full h-full object-cover transition-all duration-700 ${
                                        isHover || isOpen
                                            ? "grayscale-0 scale-100 opacity-90"
                                            : "grayscale opacity-50 scale-105"
                                    }`}
                                />
                                <div
                                    className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-r from-ink via-ink/70 to-ink/25 ${
                                        isHover || isOpen ? "opacity-90" : "opacity-100"
                                    }`}
                                />
                                <div className="absolute inset-0 tv-scanlines" />
                            </div>

                            {/* row content */}
                            <div className="relative grid grid-cols-[auto_1fr] lg:grid-cols-[120px_1fr_auto] items-center gap-x-6 gap-y-3 py-7 md:py-9 px-2 md:px-4">
                                {/* date block */}
                                <div className="flex lg:block items-baseline gap-2">
                                    <span className="pixel text-3xl md:text-4xl text-volt leading-none block">
                                        {day}
                                    </span>
                                    <span className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase block lg:mt-1">
                                        {month}&apos;{year}
                                    </span>
                                </div>

                                {/* title + meta */}
                                <div className="min-w-0">
                                    <h3
                                        data-text={event.title}
                                        className={`glitch-text ${isHover ? "glitching" : ""} pixel uppercase leading-[1.05] text-2xl md:text-4xl lg:text-5xl text-bone transition-colors duration-300`}
                                    >
                                        {event.title}
                                    </h3>
                                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase">
                                        <span className="text-ice">
                                            {event.venue} · {event.city}
                                        </span>
                                        {event.lineup?.length > 0 && (
                                            <span className="text-ghost">
                                                {event.lineup.join(" / ")}
                                            </span>
                                        )}
                                        <span
                                            className={
                                                event.type === "techno"
                                                    ? "text-volt"
                                                    : event.type === "mystery"
                                                      ? "text-ice"
                                                      : "text-dim"
                                            }
                                        >
                                            [
                                            {event.type === "techno"
                                                ? "TECHNO"
                                                : event.type === "mystery"
                                                  ? "???"
                                                  : "ALT/PUNK"}
                                            ]
                                        </span>
                                    </div>

                                    {/* expansion — opens on CLICK, lets the flyer breathe */}
                                    <div
                                        className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isOpen && !past
                                                ? "max-h-[30rem] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="h-48 md:h-72" />
                                        <div className="pb-4">
                                            {event.subtitle && (
                                                <p className="font-sans text-lg md:text-xl text-bone max-w-xl">
                                                    {event.subtitle}
                                                </p>
                                            )}
                                            <p className="font-mono text-[11px] tracking-[0.25em] text-ice uppercase mt-3">
                                                {formatEventDate(event.date)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* right rail: countdown + tickets (the only link) */}
                                <div className="col-span-2 lg:col-span-1 lg:justify-self-end flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 lg:gap-4">
                                    {past ? (
                                        <span className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase">
                                            ▮ ARCHIVED
                                        </span>
                                    ) : (
                                        <>
                                            <Countdown date={event.date} />
                                            {soldOut ? (
                                                <span className="pixel text-xs text-danger border border-danger px-5 py-2.5 uppercase">
                                                    Sold out
                                                </span>
                                            ) : event.ticketUrl ? (
                                                <a
                                                    href={event.ticketUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="btn-danger btn-bracket inline-block text-xs px-6 py-3"
                                                >
                                                    Tickets →
                                                </a>
                                            ) : (
                                                <span className="pixel text-xs text-ghost border border-line px-5 py-2.5 uppercase">
                                                    Tickets ???
                                                </span>
                                            )}
                                            <span className="hidden lg:block font-mono text-[9px] tracking-[0.25em] text-ghost uppercase">
                                                [ {isOpen ? "− CLOSE" : "+ DETAILS"} ]
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    );

                    return <li key={event.id}>{Row}</li>;
                })}
            </ul>

            {archive && events.length === 0 && (
                <p className="font-mono text-xs text-ghost tracking-[0.2em] uppercase py-10">
                    ▒ NO ARCHIVED TRANSMISSIONS YET
                </p>
            )}
        </div>
    );
}
