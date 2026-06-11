"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * The wall — a quiet masonry collage of shots from the floor.
 * Grayscale until touched, click to expand. No scroll tricks.
 */
export default function GalleryWall({ images }) {
    const [expanded, setExpanded] = useState(null);

    return (
        <>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 [column-fill:_balance]">
                {images.map((src, i) => (
                    <motion.button
                        key={src}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                        onClick={() => setExpanded(src)}

                        className="relative block w-full mb-2 md:mb-3 break-inside-avoid overflow-hidden group cursor-pointer"
                    >
                        <img
                            src={src}
                            alt={`MINDLESS event photo ${i + 1}`}
                            loading="lazy"
                            className="w-full h-auto grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                        />
                        <span className="absolute inset-0 tv-scanlines opacity-50 pointer-events-none" />
                        <span className="absolute bottom-2 left-2 font-mono text-[8px] tracking-[0.25em] text-bone/80 bg-ink/70 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            IMG_{String(i + 1).padStart(3, "0")} ▪ SAN JUAN PR
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* lightbox */}
            {expanded && (
                <div
                    className="fixed inset-0 z-[120] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    onClick={() => setExpanded(null)}
                >
                    <img
                        src={expanded}
                        alt="Expanded event photo"
                        className="max-w-full max-h-full object-contain border border-line"
                    />
                    <span className="absolute top-5 right-6 pixel text-xs text-dim uppercase">
                        [ Close ]
                    </span>
                </div>
            )}
        </>
    );
}
