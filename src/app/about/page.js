import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import GalleryWall from "@/components/GalleryWall";
import Reveal from "@/components/Reveal";
import { getGalleryImages } from "@/lib/gallery";
import { site } from "@/data/site";

export const metadata = {
    title: "About",
    description: site.description,
    alternates: { canonical: "/about" },
};

const PILLARS = [
    {
        es: "LA RAVE",
        en: "Hard Techno",
        body: "Dimensions is our flagship — hard techno all night, industrial BPMs, strobes, warehouse energy. Built for the floor, not the feed.",
    },
    {
        es: "EL RUIDO",
        en: "Alt / Punk",
        body: "The island's heavier side: live bands, alternative, punk, nu-metal. Real amps, real pits, no playlists.",
    },
    {
        es: "EL ARCHIVO",
        en: "The Lens",
        body: "We film everything — our events and the scene around them, all over Puerto Rico. The archive is the proof that this happened.",
    },
];

export default function AboutPage() {
    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Reveal>
                    <SectionHeading index="05" kicker="NOSOTROS" title="What is Mindless?" />
                </Reveal>

                <div className="grid lg:grid-cols-[1fr_380px] gap-16">
                    <div>
                        <Reveal delay={0.1}>
                            <p className="statement text-2xl md:text-4xl text-ghost max-w-4xl">
                                <span className="text-bone">Mindless Entertainment</span> was
                                born in <span className="text-bone">San Juan, Puerto Rico</span>{" "}
                                in {site.founded}. From warehouses to dive bars we built the
                                island&apos;s home for{" "}
                                <span className="text-volt">hard techno</span> and{" "}
                                <span className="text-volt">alt / punk</span> noise — and we
                                film all of it.
                            </p>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="mt-16 grid md:grid-cols-3 gap-px bg-line border border-line">
                                {PILLARS.map((p, i) => (
                                    <div key={p.en} className="bg-ink p-7">
                                        <p className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase mb-1">
                                            {`${String(i + 1).padStart(2, "0")} // ${p.es}`}
                                        </p>
                                        <h3 className="pixel text-lg uppercase mb-4 text-volt">
                                            {p.en}
                                        </h3>
                                        <p className="font-sans text-sm leading-relaxed text-dim">
                                            {p.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="mt-16 max-w-3xl space-y-5 font-sans text-base leading-relaxed text-[#c3c5d0]">
                                <p>
                                    Since {site.founded} we&apos;ve moved through venues all over
                                    the island — La Respuesta, La Caverna, El Nie, Shipwreck
                                    Studios, warehouses, wherever the underground fits that
                                    night. <span className="text-bone">Dimensions</span> grew
                                    from a local hard techno night into the series that brought
                                    our first international headliner to San Juan. On the heavy
                                    side, <span className="text-bone">Nü-Skool</span> and{" "}
                                    <span className="text-bone">Myscene</span> keep the island&apos;s
                                    nu metal and metalcore blood pumping.
                                </p>
                                <p>
                                    Original tracks debut on our floors, our sets end up on{" "}
                                    <a
                                        href="https://www.youtube.com/@MindlessEntertainmentTV"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-volt underline underline-offset-4"
                                    >
                                        the channel
                                    </a>
                                    , and the residents you see on the{" "}
                                    <Link
                                        href="/artists"
                                        className="text-volt underline underline-offset-4"
                                    >
                                        roster
                                    </Link>{" "}
                                    built this sound with us. If it happened in the PR
                                    underground, we were probably filming it.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.35}>
                            <div className="mt-16">
                                <p className="font-mono text-[10px] tracking-[0.35em] text-ghost uppercase mb-6 border-b border-line pb-4">
                                    ▮ Proof <span className="text-line">{"//"}</span> From the floor
                                </p>
                                <GalleryWall images={getGalleryImages().slice(8, 14)} />
                            </div>
                        </Reveal>
                    </div>

                    {/* side rail */}
                    <Reveal delay={0.25}>
                        <div className="border border-line bg-panel/60 p-7 h-fit lg:sticky lg:top-32">
                            <p className="font-mono text-[10px] tracking-[0.35em] text-ghost uppercase mb-6">
                                ▮ Datasheet
                            </p>
                            <dl className="space-y-4 font-mono text-xs">
                                {[
                                    ["EST.", site.founded],
                                    ["BASE", `${site.city}, PR`],
                                    ["COORDS", site.coords],
                                    ["SERIES", "DIMENSIONS"],
                                    ["LANES", "TECHNO / ALT / PUNK"],
                                    ["IG", "@mindlessentertainmenttv"],
                                ].map(([k, v]) => (
                                    <div key={k} className="flex justify-between gap-4 border-b border-line pb-3">
                                        <dt className="text-ghost tracking-[0.2em]">{k}</dt>
                                        <dd className="text-ice text-right">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                            <a
                                href={`mailto:${site.email}`}
                                className="btn-ghost-blue block text-center mt-8 font-mono text-xs tracking-[0.25em] uppercase px-6 py-3"
                            >
                                Book us →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
