"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";

/**
 * The archive as a TV deck — one big ON AIR player, a channel
 * list beside it. No cards, no grid of embeds.
 */
export default function VideoDeck({ videos }) {
    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState(false);
    const current = videos[active];
    const hasSignal = Boolean(current?.youtubeId);

    const select = (i) => {
        setActive(i);
        setPlaying(false);
    };

    return (
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* featured player */}
            <div className="min-w-0">
                <div className="relative aspect-video overflow-hidden border border-line bg-panel">
                    {playing && hasSignal ? (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                            title={current.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    ) : hasSignal ? (
                        <button
                            onClick={() => setPlaying(true)}

                            className="absolute inset-0 w-full h-full group"
                            aria-label={`Play ${current.title}`}
                        >
                            <img
                                src={`https://i.ytimg.com/vi/${current.youtubeId}/hqdefault.jpg`}
                                alt={current.title}
                                className="w-full h-full object-cover grayscale-[0.4] contrast-110 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                            />
                            <span className="absolute inset-0 tv-scanlines" />
                            <span className="absolute inset-0 bg-ink/25 group-hover:bg-ink/5 transition-colors" />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-14 border border-bone/60 bg-ink/70 backdrop-blur-sm pixel text-bone text-lg group-hover:border-volt group-hover:text-volt transition-colors">
                                ▶
                            </span>
                        </button>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <img src="/icon-tight.png" alt="" className="w-16 opacity-[0.12] grayscale" />
                            <ScrambleText className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase">
                                ▒ SIGNAL PENDING — YOUTUBE ID NEEDED
                            </ScrambleText>
                        </div>
                    )}
                    {/* broadcast chrome */}
                    <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.3em] uppercase text-danger bg-ink/70 px-2 py-1">
                        <span className="blink">●</span> ON AIR
                    </span>
                    <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.3em] uppercase text-ice bg-ink/70 px-2 py-1">
                        CH-{String(active + 1).padStart(2, "0")}
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="pixel text-xl md:text-2xl uppercase leading-tight">
                        {current?.title}
                    </h3>
                    {current?.description && (
                        <p className="font-sans text-sm text-dim mt-2 max-w-xl leading-relaxed">
                            {current.description}
                        </p>
                    )}
                </div>
            </div>

            {/* channel list */}
            <ul className="border-t border-line min-w-0">
                {videos.map((video, i) => (
                    <li key={video.id}>
                        <button
                            onClick={() => select(i)}

                            className={`row-sweep group w-full text-left flex items-center gap-4 py-4 px-3 border-b border-line transition-colors ${
                                active === i ? "bg-panel" : ""
                            }`}
                        >
                            <span
                                className={`pixel text-[10px] shrink-0 ${
                                    active === i ? "text-volt" : "text-ghost"
                                }`}
                            >
                                {active === i ? "▸" : " "} CH-{String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0">
                                <motion.span
                                    className={`block font-mono text-xs uppercase tracking-[0.1em] truncate transition-colors ${
                                        active === i
                                            ? "text-bone"
                                            : "text-dim group-hover:text-bone"
                                    }`}
                                >
                                    {video.title}
                                </motion.span>
                                <span className="block font-mono text-[9px] tracking-[0.2em] text-ghost uppercase mt-1">
                                    {video.youtubeId ? "READY" : "PENDING"} ▪{" "}
                                    {new Date(`${video.date}T12:00:00-04:00`)
                                        .toLocaleDateString("en-US", {
                                            month: "short",
                                            year: "numeric",
                                            timeZone: "America/Puerto_Rico",
                                        })
                                        .toUpperCase()}
                                </span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
