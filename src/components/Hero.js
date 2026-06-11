"use client";

import { motion } from "framer-motion";
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
    return (
        <section className="relative flex flex-col justify-end min-h-[100svh] overflow-hidden bg-ink">
            {/* full-bleed video — the floor itself */}
            <div className="absolute inset-0 group">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/photos/gallery/crowd-01.jpg"
                    className="w-full h-full object-cover opacity-60 grayscale contrast-125"
                >
                    <source src="/bgvid.mp4" type="video/mp4" />
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
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="statement text-bone text-[5.4vw] md:text-[3.6vw] lg:text-[3vw] select-none"
                    >
                        The hardest techno and alt events in Puerto Rico. Desde San
                        Juan, pa&apos;l mundo.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="bracket-note hidden lg:block font-mono text-[10px] leading-relaxed text-dim uppercase tracking-[0.12em]"
                    >
                        Unmatched dance floor energy. Hard techno raves and alt/punk
                        noise, all over the island, since {site.founded}.
                        <span className="block mt-2 text-ghost">
                            {site.coords} <span className="text-danger blink">●</span>
                        </span>
                    </motion.div>
                </div>

                {/* buy tickets — teasing at the bottom, red, glowing on hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex justify-center mt-8 md:mt-10"
                >
                    <motion.button
                        onClick={() =>
                            document
                                .getElementById("schedule")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                        aria-label="Scroll to upcoming events"
                        className="group flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                        <span className="pixel text-xs md:text-sm tracking-wide text-danger uppercase transition-all duration-300 group-hover:[text-shadow:0_0_14px_rgba(255,43,54,0.9),0_0_40px_rgba(255,43,54,0.5)]">
                            Buy tickets
                        </span>
                        <span className="pixel text-danger text-lg leading-none transition-all duration-300 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,43,54,0.9))]">
                            ↓
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            <Ticker />
        </section>
    );
}
