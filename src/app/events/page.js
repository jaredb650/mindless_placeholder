import SectionHeading from "@/components/SectionHeading";
import EventsList from "@/components/EventsList";
import PastEventsGrid from "@/components/PastEventsGrid";
import Reveal from "@/components/Reveal";
import { upcomingEvents, pastEvents, parseEventDate } from "@/data/events";
import { socials } from "@/data/site";

export const metadata = {
    title: "Events",
    description:
        "Upcoming Mindless Entertainment events in Puerto Rico — hard techno raves and alt/punk shows. Tickets here.",
    alternates: { canonical: "/events" },
};

// MusicEvent schema for every upcoming event — feeds Google's
// event rich results so shows surface in search.
function eventsJsonLd(events) {
    return events.map((e) => ({
        "@context": "https://schema.org",
        "@type": "MusicEvent",
        name: e.title,
        startDate: parseEventDate(e.date).toISOString(),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: e.venue,
            address: {
                "@type": "PostalAddress",
                addressLocality: "San Juan",
                addressRegion: "PR",
                addressCountry: "PR",
            },
        },
        image: e.image ? [`https://mindless.pr${e.image}`] : undefined,
        description: e.subtitle !== "???" ? e.subtitle : undefined,
        organizer: {
            "@type": "Organization",
            name: "Mindless Entertainment",
            url: "https://mindless.pr",
        },
        offers: e.ticketUrl
            ? {
                  "@type": "Offer",
                  url: e.ticketUrl,
                  availability:
                      e.status === "soldout"
                          ? "https://schema.org/SoldOut"
                          : "https://schema.org/InStock",
              }
            : undefined,
        performer: e.lineup?.length
            ? e.lineup
                  .filter((n) => n !== "???")
                  .map((n) => ({ "@type": "MusicGroup", name: n }))
            : undefined,
    }));
}

export default function EventsPage() {
    const upcoming = upcomingEvents();
    const past = pastEvents();
    const ig = socials.find((s) => s.primary);

    return (
        <div className="pt-32 md:pt-40 pb-24">
            {upcoming.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(eventsJsonLd(upcoming)),
                    }}
                />
            )}
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Reveal>
                    <SectionHeading index="01" kicker="EVENTOS" title="The Schedule" />
                </Reveal>

                {upcoming.length > 0 ? (
                    <>
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
                    </>
                ) : (
                    <Reveal>
                        <div className="border-y border-line py-16 text-center">
                            <p className="font-mono text-xs tracking-[0.3em] text-ghost uppercase mb-4">
                                ▒▒ Standby — no scheduled transmission ▒▒
                            </p>
                            <p className="font-sans text-dim">
                                The next event drops on Instagram first.
                            </p>
                            <a
                                href={ig?.href}
                                target="_blank"
                                rel="noopener noreferrer"

                                className="btn-ghost-blue inline-block mt-6 font-mono text-xs tracking-[0.25em] uppercase px-6 py-3"
                            >
                                Follow {ig?.handle} ↗
                            </a>
                        </div>
                    </Reveal>
                )}

                {past.length > 0 && (
                    <div className="mt-24">
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
            </div>
        </div>
    );
}
