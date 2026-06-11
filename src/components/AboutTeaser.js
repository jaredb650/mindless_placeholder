import Link from "next/link";
import { site } from "@/data/site";

/**
 * Quick transmission between schedule and residents — who we
 * are + what Dimensions is. The full story lives at /about.
 */
export default function AboutTeaser() {
    return (
        <div className="grid lg:grid-cols-[1fr_1fr_auto] gap-10 lg:gap-16 items-end">
            <div>
                <p className="font-mono text-[10px] tracking-[0.35em] text-ghost uppercase mb-4">
                    ▮ Who we are <span className="text-line">{"//"}</span> Quiénes somos
                </p>
                <p className="statement text-lg md:text-2xl text-ghost">
                    <span className="text-bone">Mindless Entertainment</span> is the
                    underground of <span className="text-bone">San Juan, PR</span> —{" "}
                    <span className="text-volt">hard techno</span> raves and{" "}
                    <span className="text-volt">alt / punk</span> noise, filmed and
                    archived since {site.founded}.
                </p>
            </div>

            <div>
                <p className="font-mono text-[10px] tracking-[0.35em] text-ghost uppercase mb-4">
                    ▮ Dimensions <span className="text-line">{"//"}</span> La serie
                </p>
                <p className="font-sans text-sm md:text-base text-dim leading-relaxed max-w-md">
                    <span className="pixel text-volt text-xs uppercase">Dimensions</span>{" "}
                    is our flagship hard techno series — industrial BPMs, strobes, and
                    warehouse energy, all night. Built for the floor, not the feed.
                </p>
            </div>

            <Link
                href="/about"
                className="btn-ghost-blue inline-block pixel text-[11px] uppercase px-7 py-3.5 justify-self-start lg:justify-self-end whitespace-nowrap"
            >
                Full story →
            </Link>
        </div>
    );
}
