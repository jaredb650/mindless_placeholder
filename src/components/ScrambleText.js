"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ﾊﾐﾋｰｳｼﾅﾓﾆｻABCDEFXYZ0123456789▪/<>_";

/**
 * Text that decrypts into place — matrix DNA. Scrambles on first
 * viewport entry; `rescramble` re-runs it on hover (for list rows).
 */
export default function ScrambleText({
    children,
    as: Tag = "span",
    rescramble = false,
    duration = 700,
    className = "",
    ...rest
}) {
    const text = typeof children === "string" ? children : String(children ?? "");
    const [display, setDisplay] = useState(text);
    const ref = useRef(null);
    const rafRef = useRef(0);
    const playedRef = useRef(false);

    const play = useCallback(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(text);
            return;
        }
        cancelAnimationFrame(rafRef.current);
        const start = performance.now();
        const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const settled = Math.floor(t * text.length);
            let out = text.slice(0, settled);
            for (let i = settled; i < text.length; i++) {
                const c = text[i];
                out += c === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
            }
            setDisplay(out);
            if (t < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
    }, [text, duration]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !playedRef.current) {
                    playedRef.current = true;
                    play();
                    io.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, [play]);

    return (
        <Tag
            ref={ref}
            onMouseEnter={rescramble ? play : undefined}
            className={className}
            {...rest}
        >
            {display}
        </Tag>
    );
}
