"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text with chromatic-aberration glitch slices.
 * - hover: glitches while hovered (CSS, see globals.css)
 * - ambient: also auto-fires a short burst every few seconds
 */
export default function GlitchText({
    children,
    as: Tag = "span",
    ambient = false,
    className = "",
    ...rest
}) {
    const [glitching, setGlitching] = useState(false);
    const text = typeof children === "string" ? children : "";
    const timers = useRef([]);

    useEffect(() => {
        if (!ambient) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let cancelled = false;
        const schedule = () => {
            const delay = 3000 + Math.random() * 5000;
            timers.current.push(
                setTimeout(() => {
                    if (cancelled) return;
                    setGlitching(true);
                    timers.current.push(
                        setTimeout(() => {
                            if (cancelled) return;
                            setGlitching(false);
                            schedule();
                        }, 180 + Math.random() * 320)
                    );
                }, delay)
            );
        };
        schedule();
        return () => {
            cancelled = true;
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, [ambient]);

    return (
        <Tag
            data-text={text}
            className={`glitch-text ${glitching ? "glitching" : ""} ${className}`}
            {...rest}
        >
            {children}
        </Tag>
    );
}
