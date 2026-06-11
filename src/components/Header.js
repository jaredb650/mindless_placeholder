"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";

function ClockAST() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    hour12: false,
                    timeZone: "America/Puerto_Rico",
                })
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <span suppressHydrationWarning className="tabular-nums">
            {time || "--:--:--"} AST
        </span>
    );
}

// teletech-style paired columns: [top, bottom]
const NAV_PAIRS = [
    [
        { label: "Index", href: "/" },
        { label: "Events", href: "/events" },
    ],
    [
        { label: "Residents", href: "/artists" },
        { label: "Videos", href: "/videos" },
    ],
    [
        { label: "Blog", href: "/blog" },
        { label: "About", href: "/about" },
    ],
    [
        { label: "Contact", href: "mailto:gio@mindless.pr", mailto: true },
        { label: "Tickets", href: "/events", danger: true },
    ],
];

const MOBILE_NAV = [
    { label: "Index", labelEs: "Inicio", href: "/" },
    { label: "Events", labelEs: "Eventos", href: "/events" },
    { label: "Residents", labelEs: "Residentes", href: "/artists" },
    { label: "Videos", labelEs: "Videos", href: "/videos" },
    { label: "Blog", labelEs: "Blog", href: "/blog" },
    { label: "About", labelEs: "Nosotros", href: "/about" },
    { label: "Contact", labelEs: "Contacto", href: "mailto:gio@mindless.pr", mailto: true },
];

function isActive(pathname, href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.documentElement.style.overflow = open ? "hidden" : "";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    return (
        <header className="fixed top-0 inset-x-0 z-[95] pointer-events-none">
            <div className="flex items-start justify-between px-4 md:px-6 pt-4">
                {/* left chrome */}
                <div className="pointer-events-auto flex items-center gap-3 md:gap-5 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-dim select-none bg-ink/80 backdrop-blur-sm border border-line px-3 py-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/brand/mindlessIcon.png"
                            alt="MINDLESS"
                            className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 group-hover:rotate-[360deg]"
                        />
                        <span className="pixel text-[10px] md:text-[11px] text-bone tracking-normal">
                            MINDLESS<span className="text-volt">.PR</span>
                        </span>
                    </Link>
                    <span className="hidden sm:flex items-center gap-2">
                        <span className="text-danger blink">▮</span> SAN JUAN
                    </span>
                    <span className="hidden lg:flex items-center gap-2">
                        <span className="text-volt">▮</span> EL UNDERGROUND
                    </span>
                    <span className="hidden md:inline text-ghost">
                        <ClockAST />
                    </span>
                </div>

                {/* right: boxed nav (desktop) */}
                <nav className="pointer-events-auto hidden lg:flex items-stretch bg-ink/85 backdrop-blur-md border border-line divide-x divide-line">
                    {NAV_PAIRS.map((pair, i) => (
                        <div key={i} className="flex flex-col justify-center gap-1 px-5 py-2.5">
                            {pair.map((item) => {
                                const active =
                                    !item.mailto &&
                                    isActive(pathname, item.href) &&
                                    !item.danger;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`pixel text-[10px] leading-none tracking-wide uppercase transition-colors flex items-center gap-1 ${
                                            item.danger
                                                ? "text-danger hover:text-bone"
                                                : active
                                                  ? "text-bone"
                                                  : "text-ghost hover:text-volt"
                                        }`}
                                    >
                                        <span
                                            className={`text-[8px] ${active ? "text-volt" : "opacity-0"}`}
                                        >
                                            ▸
                                        </span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                    <div className="flex items-center px-3">
                        <img src="/icon-tight.png" alt="" className="w-7 h-7" />
                    </div>
                </nav>

                {/* mobile trigger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="pointer-events-auto lg:hidden pixel text-[10px] tracking-wide text-bone uppercase bg-ink/85 backdrop-blur-sm border border-line px-3 py-2.5"
                    aria-expanded={open}
                    aria-label="Menu"
                >
                    {open ? "[ CLOSE ]" : "[ MENU ]"}
                </button>
            </div>

            {/* mobile overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden pointer-events-auto fixed inset-0 top-0 z-[-1] bg-ink/97 backdrop-blur-lg overflow-y-auto pt-20"
                    >
                        <nav className="px-6 py-8 flex flex-col gap-2">
                            {MOBILE_NAV.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="group flex items-baseline gap-4 py-3.5 border-b border-line"
                                    >
                                        <span className="font-mono text-xs text-ghost">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="pixel text-2xl uppercase group-hover:text-volt transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-ghost uppercase">
                                            {item.labelEs}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <SocialLinks />
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
