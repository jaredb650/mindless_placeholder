"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";

const TYPE_LABEL = { dj: "DJ", punk: "PUNK", alt: "ALT" };

// stand-in portraits until real ones drop into /public/artists
const FALLBACKS = [
    "/photos/gallery/crowd-05.jpg",
    "/photos/gallery/crowd-09.jpg",
    "/photos/gallery/crowd-13.jpg",
    "/photos/gallery/crowd-17.jpg",
    "/photos/gallery/crowd-19.jpg",
];

function artistImage(artist, index) {
    return artist.image ?? FALLBACKS[index % FALLBACKS.length];
}

function StatSheet({ artist, locked }) {
    return (
        <dl className="space-y-2 font-mono text-[10px] tracking-[0.2em] uppercase">
            <div className="flex justify-between gap-4 border-b border-line pb-2">
                <dt className="text-ghost">CLASS</dt>
                <dd className="text-ice">{TYPE_LABEL[artist?.type] ?? artist?.type}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-2">
                <dt className="text-ghost">STYLE</dt>
                <dd className="text-ice text-right">
                    {locked ? "???" : artist?.genres.join(" / ")}
                </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-2">
                <dt className="text-ghost">STATUS</dt>
                <dd
                    className={`text-right ${
                        locked
                            ? "text-ghost"
                            : artist?.status === "FOUNDER"
                              ? "text-danger"
                              : artist?.status?.includes("CO-ORGANIZER")
                                ? "text-ice"
                                : "text-volt"
                    }`}
                >
                    {locked ? "SLOT PENDING" : (artist?.status ?? "ACTIVE RESIDENT")}
                </dd>
            </div>
        </dl>
    );
}

/* ──────────────────────────────────────────────────────────────
   Desktop: fighting-game tile grid + preview panel (hover)
   ────────────────────────────────────────────────────────────── */

function Tile({ artist, index, selected, onSelect, className = "" }) {
    const locked = Boolean(artist.placeholder);
    return (
        <Link
            href={`/artists/${artist.slug}`}
            onMouseEnter={() => onSelect(index)}
            onFocus={() => onSelect(index)}
            className={`relative block aspect-[3/4] overflow-hidden border-2 bg-panel group transition-transform duration-200 ${
                selected ? "tile-selected z-10 scale-[1.02]" : "border-line"
            } ${className}`}
        >
            {locked ? (
                <div className="absolute inset-0 flex items-center justify-center bg-ink">
                    <span className="pixel text-6xl md:text-7xl text-line group-hover:text-ghost transition-colors select-none">
                        ?
                    </span>
                </div>
            ) : (
                <img
                    src={artistImage(artist, index)}
                    alt={artist.name}
                    loading="lazy"
                    style={{ objectPosition: artist.imagePosition ?? "center" }}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                        artist.image ? "" : "grayscale"
                    } ${selected ? "scale-105" : "contrast-110"}`}
                />
            )}
            {!locked && !artist.image && (
                <span className="absolute inset-0 bg-blue/25 mix-blend-color pointer-events-none" />
            )}
            <span className="absolute inset-0 tv-scanlines pointer-events-none" />

            <span
                className={`absolute top-1.5 left-1.5 pixel text-[9px] px-1.5 py-0.5 ${
                    selected ? "bg-volt text-ink" : "bg-ink/80 text-ghost"
                }`}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <span
                className={`absolute inset-x-0 bottom-0 px-2 py-1.5 border-t-2 transition-colors ${
                    selected
                        ? "bg-volt text-ink border-volt"
                        : "bg-ink/90 text-bone border-line"
                }`}
            >
                <span className="pixel text-[10px] md:text-[11px] uppercase leading-none block truncate">
                    {locked ? "???" : artist.name}
                </span>
                <span
                    className={`font-mono text-[8px] tracking-[0.2em] uppercase block mt-0.5 ${
                        selected ? "text-ink/70" : "text-ghost"
                    }`}
                >
                    {TYPE_LABEL[artist.type] ?? artist.type}
                </span>
            </span>
        </Link>
    );
}

function DesktopRoster({ artists }) {
    // hovered = the lit tile (clears on mouse leave);
    // panelIdx = what the preview panel shows (keeps last fighter)
    const [hovered, setHovered] = useState(null);
    const [panelIdx, setPanelIdx] = useState(0);
    const current = artists[panelIdx];
    const locked = Boolean(current?.placeholder);

    const select = (i) => {
        setHovered(i);
        setPanelIdx(i);
    };

    // fighting-game stagger: incomplete final row of N%3 tiles is
    // centered half a tile under the full rows
    const remainder = artists.length % 3;
    const staggerStart = artists.length - remainder;
    const staggerClass = (i) => {
        if (remainder === 0 || i !== staggerStart) return "";
        return remainder === 2 ? "col-start-2" : "col-start-3";
    };

    return (
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            <div
                className="grid grid-cols-6 gap-2 md:gap-3"
                onMouseLeave={() => setHovered(null)}
            >
                {artists.map((artist, i) => (
                    <Tile
                        key={artist.slug}
                        artist={artist}
                        index={i}
                        selected={hovered === i}
                        onSelect={select}
                        className={`col-span-2 ${staggerClass(i)}`}
                    />
                ))}
            </div>

            {/* preview panel */}
            <div className="sticky top-28 border-2 border-line bg-panel">
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-line">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={current?.slug}
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            {locked ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-ink">
                                    <span className="pixel text-9xl text-line select-none">?</span>
                                </div>
                            ) : (
                                <img
                                    src={artistImage(current, panelIdx)}
                                    alt={current?.name ?? ""}
                                    style={{
                                        objectPosition: current?.imagePosition ?? "center 25%",
                                    }}
                                    className={`w-full h-full object-cover ${
                                        current?.image ? "" : "grayscale opacity-80"
                                    }`}
                                />
                            )}
                            {!locked && !current?.image && (
                                <div className="absolute inset-0 bg-blue/25 mix-blend-color" />
                            )}
                            <div className="absolute inset-0 tv-scanlines" />
                        </motion.div>
                    </AnimatePresence>
                    <span className="absolute top-2 left-2 pixel text-[9px] bg-danger text-bone px-2 py-1 uppercase">
                        P1
                    </span>
                    {!locked && !current?.image && (
                        <span className="absolute top-2 right-2 font-mono text-[8px] tracking-[0.25em] text-ghost bg-ink/70 px-2 py-1 uppercase">
                            VISUAL://STAND-IN
                        </span>
                    )}
                </div>

                <div className="p-5">
                    <ScrambleText
                        key={current?.slug}
                        as="p"
                        duration={450}
                        className="pixel text-3xl uppercase leading-none text-bone"
                    >
                        {locked ? "??????" : (current?.name ?? "")}
                    </ScrambleText>

                    <div className="mt-4">
                        <StatSheet artist={current} locked={locked} />
                    </div>

                    {!locked && current?.tagline && (
                        <p className="font-sans text-sm text-dim mt-4 leading-relaxed">
                            {current.tagline}
                        </p>
                    )}

                    <Link
                        href={`/artists/${current?.slug}`}
                        className="btn-ghost-blue block text-center mt-5 pixel text-[11px] uppercase px-6 py-3"
                    >
                        {locked ? "View slot →" : "View file →"}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────
   Mobile: banner rows — the banner crossing the center of the
   screen pops its info card open underneath. Tap → bio page.
   ────────────────────────────────────────────────────────────── */

function MobileRoster({ artists }) {
    const [active, setActive] = useState(0);
    const wrapRef = useRef(null);

    useEffect(() => {
        const banners = wrapRef.current?.querySelectorAll("[data-banner]");
        if (!banners?.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(Number(entry.target.dataset.banner));
                    }
                });
            },
            { rootMargin: "-38% 0px -38% 0px", threshold: 0 }
        );
        banners.forEach((b) => io.observe(b));
        return () => io.disconnect();
    }, [artists]);

    return (
        <div ref={wrapRef} className="space-y-3">
            {artists.map((artist, i) => {
                const locked = Boolean(artist.placeholder);
                const isActive = active === i;
                return (
                    <div
                        key={artist.slug}
                        data-banner={i}
                        className={`border-2 transition-colors duration-300 ${
                            isActive ? "tile-selected" : "border-line"
                        }`}
                    >
                        {/* banner — grows tall when active so the FACE is the star */}
                        <Link
                            href={`/artists/${artist.slug}`}
                            className={`relative block overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isActive ? "h-96" : "h-24"
                            }`}
                        >
                            {locked ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-ink">
                                    <span className="pixel text-5xl text-line select-none">?</span>
                                </div>
                            ) : (
                                <img
                                    src={artistImage(artist, i)}
                                    alt={artist.name}
                                    loading="lazy"
                                    style={{
                                        objectPosition: artist.imagePosition ?? "center 25%",
                                    }}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                                        artist.image ? "" : "grayscale"
                                    } ${isActive ? "grayscale-0" : "contrast-110"}`}
                                />
                            )}
                            {!locked && !artist.image && (
                                <span className="absolute inset-0 bg-blue/25 mix-blend-color" />
                            )}
                            <span
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                    isActive
                                        ? "bg-gradient-to-t from-ink/90 via-transparent to-transparent"
                                        : "bg-gradient-to-r from-ink/90 via-ink/40 to-transparent"
                                }`}
                            />
                            <span className="absolute inset-0 tv-scanlines" />

                            <span className="absolute inset-x-4 bottom-3 flex flex-col justify-end">
                                <span className="font-mono text-[9px] tracking-[0.25em] text-ghost">
                                    {String(i + 1).padStart(2, "0")}{" "}
                                    <span className={isActive ? "text-volt" : ""}>
                                        [{TYPE_LABEL[artist.type] ?? artist.type}]
                                    </span>
                                </span>
                                <span
                                    className={`pixel text-2xl uppercase leading-none mt-1.5 transition-colors ${
                                        isActive ? "text-volt" : "text-bone"
                                    }`}
                                >
                                    {locked ? "???" : artist.name}
                                </span>
                            </span>

                            {isActive && (
                                <span className="absolute top-2 right-2 pixel text-[9px] bg-danger text-bone px-2 py-1 uppercase">
                                    P1
                                </span>
                            )}
                        </Link>

                        {/* info card — pops out from under the active banner */}
                        <div
                            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isActive ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="p-3 border-t-2 border-line bg-panel">
                                <StatSheet artist={artist} locked={locked} />
                                <Link
                                    href={`/artists/${artist.slug}`}
                                    className="btn-ghost-blue block text-center mt-3 pixel text-[10px] uppercase px-6 py-2.5"
                                >
                                    {locked ? "View slot →" : "View file →"}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/**
 * The roster as a character-select screen.
 * Desktop: tile grid + hover preview panel.
 * Mobile: banner rows — scrolling pops each fighter's info card
 * open as their banner crosses the center of the screen.
 */
export default function ResidentsRoster({ artists }) {
    return (
        <div>
            <p className="pixel text-[11px] md:text-xs text-ice uppercase tracking-wide mb-6">
                <span className="text-danger blink">▮</span> Select your resident{" "}
                <span className="text-ghost">{"//"} Elige tu residente</span>
            </p>

            <div className="hidden lg:block">
                <DesktopRoster artists={artists} />
            </div>
            <div className="lg:hidden">
                <MobileRoster artists={artists} />
            </div>
        </div>
    );
}
