import Link from "next/link";
import { notFound } from "next/navigation";
import GlitchImage from "@/components/GlitchImage";
import GlitchText from "@/components/GlitchText";
import Reveal from "@/components/Reveal";
import { artists, getArtist } from "@/data/artists";

const TYPE_LABEL = { dj: "DJ", punk: "PUNK", alt: "ALT" };

export function generateStaticParams() {
    return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const artist = getArtist(slug);
    if (!artist) return {};
    return {
        title: artist.name,
        description: artist.tagline,
        alternates: { canonical: `/artists/${slug}` },
        openGraph: {
            title: `${artist.name} · MINDLESS`,
            description: artist.tagline,
            type: "profile",
            ...(artist.image && { images: [{ url: artist.image }] }),
        },
    };
}

export default async function ArtistPage({ params }) {
    const { slug } = await params;
    const artist = getArtist(slug);
    if (!artist) notFound();

    const idx = artists.findIndex((a) => a.slug === slug);
    const next = artists[(idx + 1) % artists.length];

    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: artist.name,
        jobTitle: artist.role,
        description: artist.tagline,
        ...(artist.image && { image: `https://mindless.pr${artist.image}` }),
        url: `https://mindless.pr/artists/${slug}`,
        memberOf: {
            "@type": "Organization",
            name: "Mindless Entertainment",
            url: "https://mindless.pr",
        },
        ...(Object.keys(artist.socials).length > 0 && {
            sameAs: Object.values(artist.socials),
        }),
    };

    return (
        <div className="pt-32 md:pt-40 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Reveal>
                    <Link
                        href="/artists"
                        className="font-mono text-[11px] tracking-[0.3em] text-ghost hover:text-volt uppercase transition-colors"
                    >
                        ← Roster
                    </Link>
                </Reveal>

                <div className="grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 mt-8">
                    {/* portrait */}
                    <Reveal>
                        <div className="lg:sticky lg:top-32">
                            <GlitchImage
                                src={artist.image}
                                alt={artist.name}
                                label="PHOTO INCOMING"
                                className="aspect-[3/4] w-full border border-line"
                            />
                            <div className="flex items-center justify-between mt-4 font-mono text-[10px] tracking-[0.25em] uppercase">
                                <span className="text-ice">
                                    FILE {String(idx + 1).padStart(2, "0")}/
                                    {String(artists.length).padStart(2, "0")}
                                </span>
                                <span className="text-ghost">▮ RESIDENT</span>
                            </div>
                        </div>
                    </Reveal>

                    {/* dossier */}
                    <div>
                        <Reveal delay={0.1}>
                            <p className="font-mono text-[11px] tracking-[0.35em] text-volt uppercase mb-4">
                                ▸ {TYPE_LABEL[artist.type] ?? artist.type}{" "}
                                <span className="text-ghost">{`// ${artist.role}`}</span>
                            </p>
                            <h1 className="pixel uppercase leading-[0.95] text-5xl md:text-7xl">
                                <GlitchText ambient>{artist.name}</GlitchText>
                            </h1>
                            <p className="font-sans text-lg text-dim mt-5 max-w-xl">
                                {artist.tagline}
                            </p>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="flex flex-wrap gap-2 mt-8">
                                {artist.genres.map((g) => (
                                    <span
                                        key={g}
                                        className="font-mono text-[10px] tracking-[0.25em] text-ice border border-line px-3 py-1.5 uppercase"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <div className="mt-12 border-t border-line pt-8">
                                <p className="font-mono text-[10px] tracking-[0.35em] text-ghost uppercase mb-6">
                                    The story <span className="text-line">{"//"}</span> La historia
                                </p>
                                <div className="space-y-5 max-w-2xl">
                                    {artist.story.map((para, i) => (
                                        <p
                                            key={i}
                                            className="font-sans text-base leading-relaxed text-[#c3c5d0]"
                                        >
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {Object.keys(artist.socials).length > 0 && (
                            <Reveal delay={0.3}>
                                <div className="mt-12 border-t border-line pt-8">
                                    <p className="font-mono text-[10px] tracking-[0.35em] text-ghost uppercase mb-5">
                                        Signal
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(artist.socials).map(([label, href]) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-ghost-blue font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5"
                                            >
                                                {label} ↗
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {/* next artist */}
                        <Reveal delay={0.35}>
                            <Link
                                href={`/artists/${next.slug}`}
                                className="group block mt-16 border border-line bg-panel/60 hover:bg-panel p-6 transition-colors"
                            >
                                <p className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase mb-2">
                                    Next file →
                                </p>
                                <p className="pixel text-2xl uppercase group-hover:text-volt transition-colors">
                                    {next.name}
                                </p>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
