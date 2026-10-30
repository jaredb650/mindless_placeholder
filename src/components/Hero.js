"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const TICKER_ITEMS = [
    "HARD TECHNO",
    "ALT",
    "PUNK",
    "SAN JUAN PR",
    `EST. ${site.founded}`,
    "DIMENSIONS",
    "EL UNDERGROUND",
];

function Ticker() {
    const row = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
    return (
        <div className="border-y border-line overflow-hidden py-2.5 select-none bg-ink">
            <div className="ticker-track flex w-max gap-0" style={{ "--ticker-speed": "32s" }}>
                {[0, 1].map((half) => (
                    <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
                        {row.map((item, i) => (
                            <span
                                key={`${half}-${i}`}
                                className="pixel text-[10px] tracking-wide text-dim uppercase px-6 whitespace-nowrap"
                            >
                                {item} <span className="text-volt ml-6">▪</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Hero() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    // stop decoding the loop once it's off screen or the tab is hidden
    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;
        let onScreen = true;
        const sync = () => {
            if (onScreen && !document.hidden) video.play().catch(() => {});
            else video.pause();
        };
        const io = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
        });
        io.observe(section);
        document.addEventListener("visibilitychange", sync);
        return () => {
            io.disconnect();
            document.removeEventListener("visibilitychange", sync);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex flex-col justify-end min-h-[100svh] overflow-hidden bg-ink"
        >
            {/* full-bleed video — the floor itself. The grayscale +
                contrast look is baked into the encode (and the poster),
                so there's no per-frame CSS filter. */}
            <div className="absolute inset-0 group">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/video/hero-poster.jpg"
                    className="w-full h-full object-cover opacity-60"
                >
                    <source
                        src="/video/hero-1080.mp4"
                        type="video/mp4"
                        media="(min-width: 768px)"
                    />
                    <source src="/video/hero-720.mp4" type="video/mp4" />
                </video>
                {/* blue undertone + bottom fade for the statement */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(5,5,10,0.96) 0%, rgba(5,5,10,0.35) 35%, rgba(5,5,10,0.25) 100%), radial-gradient(ellipse 80% 60% at 50% 30%, rgba(37,99,235,0.10), transparent 70%)",
                    }}
                />
            </div>

            {/* statement block */}
            <div className="relative z-10 w-full px-4 md:px-6 pb-8 md:pb-10">
                <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-end">
                    <h1
                        className="hero-rise statement text-bone text-[5.4vw] md:text-[3.6vw] lg:text-[3vw] select-none"
                    >
                        The hardest techno and alt events in Puerto Rico. Desde San
                        Juan, pa&apos;l mundo.
                    </h1>

                    <div
                        className="hero-fade-note bracket-note hidden lg:block font-mono text-[10px] leading-relaxed text-dim uppercase tracking-[0.12em]"
                    >
                        Unmatched dance floor energy. Hard techno raves and alt/punk
                        noise, all over the island, since {site.founded}.
                        <span className="block mt-2 text-ghost">
                            {site.coords} <span className="text-danger blink">●</span>
                        </span>
                    </div>
                </div>

                {/* buy tickets — teasing at the bottom, red, glowing on hover */}
                <div className="hero-fade-cta flex justify-center mt-8 md:mt-10">
                    <button
                        onClick={() =>
                            document
                                .getElementById("schedule")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        aria-label="Scroll to upcoming events"
                        className="hero-bob group flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                        <span className="pixel text-xs md:text-sm tracking-wide text-danger uppercase transition-all duration-300 group-hover:[text-shadow:0_0_14px_rgba(255,43,54,0.9),0_0_40px_rgba(255,43,54,0.5)]">
                            Buy tickets
                        </span>
                        <span className="pixel text-danger text-lg leading-none transition-all duration-300 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,43,54,0.9))]">
                            ↓
                        </span>
                    </button>
                </div>
            </div>

            <Ticker />
        </section>
    );
}
