import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import EventsList from "@/components/EventsList";
import PastEventsGrid from "@/components/PastEventsGrid";
import AboutTeaser from "@/components/AboutTeaser";
import ResidentsRoster from "@/components/ResidentsRoster";
import GalleryWall from "@/components/GalleryWall";
import VideoDeck from "@/components/VideoDeck";
import ArticleRows from "@/components/ArticleRows";
import SocialLinks from "@/components/SocialLinks";
import Reveal from "@/components/Reveal";
import { upcomingEvents, pastEvents } from "@/data/events";
import { artists } from "@/data/artists";
import { allVideos } from "@/data/videos";
import { getAllPosts } from "@/lib/blog";
import { getGalleryImages } from "@/lib/gallery";
import { site } from "@/data/site";

function MoreLink({ href, children }) {
    return (
        <Link
            href={href}
            className="font-mono text-[11px] tracking-[0.3em] text-dim hover:text-volt uppercase transition-colors"
        >
            {children} →
        </Link>
    );
}

export default function Home() {
    const upcoming = upcomingEvents(); // ALL upcoming — never tucked away
    const past = pastEvents().slice(0, 4);
    const videos = allVideos().slice(0, 5);
    const posts = getAllPosts().slice(0, 4);
    const gallery = getGalleryImages().slice(0, 12);

    return (
        <>
            <Hero />

            {/* 01 — the schedule: every upcoming event + the archive grid */}
            <section id="schedule" className="scroll-mt-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                    <Reveal>
                        <SectionHeading index="01" kicker="EVENTOS" title="The Schedule" />
                    </Reveal>

                    {/* upcoming — loud and unmistakable */}
                    <Reveal>
                        <div className="flex items-baseline gap-4 mb-6">
                            <h3 className="pixel text-2xl md:text-4xl uppercase text-volt">
                                ▸ Upcoming
                            </h3>
                            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-ghost uppercase">
                                {"//"} Próximos — get your tickets
                            </span>
                        </div>
                    </Reveal>
                    <EventsList events={upcoming} />

                    {/* past events — pure archive, no tickets */}
                    {past.length > 0 && (
                        <div className="mt-20">
                            <Reveal>
                                <div className="flex items-baseline gap-4 mb-6">
                                    <h3 className="pixel text-2xl md:text-4xl uppercase text-ghost">
                                        ▮ Past events
                                    </h3>
                                    <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-ghost uppercase">
                                        {"//"} Pasados — the archive
                                    </span>
                                </div>
                            </Reveal>
                            <PastEventsGrid events={past} />
                        </div>
                    )}

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/events"
                            className="btn-ghost-blue inline-block pixel text-[11px] uppercase px-8 py-3.5"
                        >
                            All events →
                        </Link>
                    </div>
                </div>
            </section>

            {/* 02 — about teaser */}
            <section className="border-t border-line">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                    <Reveal>
                        <SectionHeading
                            index="02"
                            kicker="NOSOTROS"
                            title="What is Mindless?"
                            right={<MoreLink href="/about">Full story</MoreLink>}
                        />
                        <AboutTeaser />
                    </Reveal>
                </div>
            </section>

            {/* 03 — character select */}
            <section className="border-t border-line">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                    <Reveal>
                        <SectionHeading
                            index="03"
                            kicker="RESIDENTES"
                            title="The Residents"
                            right={<MoreLink href="/artists">Full roster</MoreLink>}
                        />
                    </Reveal>
                    <ResidentsRoster artists={artists} />
                </div>
            </section>

            {/* 04 — on air */}
            <section className="border-t border-line">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                    <Reveal>
                        <SectionHeading
                            index="04"
                            kicker="ARCHIVO"
                            title="On Air"
                            right={<MoreLink href="/videos">Full archive</MoreLink>}
                        />
                    </Reveal>
                    <VideoDeck videos={videos} />
                </div>
            </section>

            {/* 05 — the chronicle */}
            {posts.length > 0 && (
                <section className="border-t border-line">
                    <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                        <Reveal>
                            <SectionHeading
                                index="05"
                                kicker="LA CRÓNICA"
                                title="The Chronicle"
                                right={<MoreLink href="/blog">All articles</MoreLink>}
                            />
                        </Reveal>
                        <ArticleRows posts={posts} />
                    </div>
                </section>
            )}

            {/* 06 — the wall (second to last) */}
            {gallery.length > 0 && (
                <section className="border-t border-line">
                    <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                        <Reveal>
                            <SectionHeading index="06" kicker="LA GALERÍA" title="From the Floor" />
                        </Reveal>
                        <GalleryWall images={gallery} />
                    </div>
                </section>
            )}

            {/* 07 — the signal */}
            <section className="border-t border-line">
                <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
                    <Reveal>
                        <SectionHeading index="07" kicker="SOCIALS" title="Follow Us" />
                        <p className="font-sans text-dim max-w-xl -mt-6 mb-10">
                            {site.fullName} lives on Instagram first — flyers, drops, and
                            announcements hit there before anywhere else.
                        </p>
                        <SocialLinks size="lg" />
                    </Reveal>
                </div>
            </section>
        </>
    );
}
