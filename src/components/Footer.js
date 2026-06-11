import Link from "next/link";
import { nav, site } from "@/data/site";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-line bg-ink">
            <div className="mx-auto max-w-7xl px-4 md:px-8 pt-16 pb-10">
                {/* giant wordmark */}
                <p
                    aria-hidden="true"
                    className="pixel uppercase leading-none select-none text-stroke-blue opacity-40 text-[15vw] md:text-[8.5rem] whitespace-nowrap overflow-hidden"
                >
                    MINDLESS
                </p>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div className="col-span-2 md:col-span-1">
                        <img src="/brand/mindlessIcon.png" alt="Mindless skull mark" className="w-14 h-14 mb-4" />
                        <p className="font-mono text-[11px] leading-relaxed text-dim">
                            {site.fullName}
                            <br />
                            {site.city}, {site.region}
                            <br />
                            EST. {site.founded}
                        </p>
                    </div>

                    <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase mb-4">
                            Navigate
                        </p>
                        <ul className="space-y-2">
                            {nav.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="font-mono text-xs text-dim hover:text-volt transition-colors uppercase tracking-[0.12em]"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase mb-4">
                            Socials
                        </p>
                        <SocialLinks className="flex-col !gap-y-2" />
                    </div>

                    <div>
                        <p className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase mb-4">
                            Bookings
                        </p>
                        <a
                            href={`mailto:${site.email}`}
                            className="font-mono text-xs text-dim hover:text-volt transition-colors break-all"
                        >
                            {site.email}
                        </a>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] tracking-[0.2em] text-ghost uppercase">
                    <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</span>
                    <span>
                        {site.coords} <span className="text-line">|</span> END OF TRANSMISSION ▮
                    </span>
                </div>
            </div>
        </footer>
    );
}
