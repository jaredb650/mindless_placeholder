"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The boot sequence — the original coming-soon Matrix rain,
 * resurrected as a preloader. Plays on every load, lifts to
 * reveal the hero. Click to skip.
 */
export default function MatrixPreloader() {
    const [show, setShow] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const raf = requestAnimationFrame(() => setShow(true));

        const t = setTimeout(() => setShow(false), 2600);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t);
        };
    }, []);

    useEffect(() => {
        if (!show) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = window.innerWidth < 768 ? 18 : 16;
        const columns = Math.ceil(canvas.width / fontSize);
        // start drops at random heights so the screen fills instantly
        const drops = Array.from({ length: columns }, () =>
            Math.floor(Math.random() * (canvas.height / fontSize))
        );
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789MINDLESS".split("");

        ctx.fillStyle = "#05050a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let raf;
        let last = 0;
        const draw = (t) => {
            if (t - last >= 33) {
                ctx.fillStyle = "rgba(5, 5, 10, 0.1)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = `${fontSize}px monospace`;
                for (let i = 0; i < drops.length; i++) {
                    ctx.fillStyle = Math.random() > 0.975 ? "#FFFFFF" : "#3B82F6";
                    ctx.fillText(
                        chars[(Math.random() * chars.length) | 0],
                        i * fontSize,
                        drops[i] * fontSize
                    );
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
                last = t;
            }
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    onClick={() => setShow(false)}
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                    }}
                    className="fixed inset-0 z-[210] bg-ink cursor-pointer overflow-hidden"
                >
                    <canvas ref={canvasRef} className="absolute inset-0" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div style={{ perspective: "600px" }}>
                            <img
                                src="/brand/mindlessIcon.png"
                                alt=""
                                className="coin-spin w-28 md:w-36 h-auto opacity-90"
                            />
                        </div>
                        <p className="pixel text-bone text-xl md:text-2xl mt-6">
                            MINDLESS<span className="text-volt">.PR</span>
                        </p>
                        <p className="font-mono text-[10px] tracking-[0.4em] text-dim uppercase mt-3">
                            <span className="text-volt">▸</span> Iniciando transmisión
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
