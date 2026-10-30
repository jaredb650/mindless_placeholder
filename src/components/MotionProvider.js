"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only the DOM animation features framer-motion needs
 * (animate / exit / whileInView) instead of the full bundle.
 * Components use `m.*` instead of `motion.*` — `strict` throws
 * if a full `motion.*` component sneaks back in.
 */
export default function MotionProvider({ children }) {
    return (
        <LazyMotion features={domAnimation} strict>
            {children}
        </LazyMotion>
    );
}
