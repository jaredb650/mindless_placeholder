import { formatEventDate } from "@/data/events";

// stand-in tiles until real flyers drop into /public/events
const FALLBACKS = [
    "/photos/gallery/crowd-02.jpg",
    "/photos/gallery/crowd-06.jpg",
    "/photos/gallery/crowd-10.jpg",
    "/photos/gallery/crowd-14.jpg",
];

/**
 * The archive — past events as a quiet flyer grid. No tickets,
 * no CTAs. Proof that it happened.
 */
export default function PastEventsGrid({ events }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {events.map((event, i) => (
                <article
                    key={event.id}
                    className="relative aspect-[3/4] overflow-hidden border border-line bg-panel group"
                >
                    <img
                        src={event.image ?? FALLBACKS[i % FALLBACKS.length]}
                        alt={`${event.title} flyer`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <div className="absolute inset-0 tv-scanlines" />

                    <span className="absolute top-2 left-2 font-mono text-[8px] tracking-[0.25em] text-ghost bg-ink/70 px-1.5 py-1 uppercase">
                        ▮ ARCHIVED
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="pixel text-sm md:text-base uppercase leading-tight text-bone group-hover:text-volt transition-colors">
                            {event.title}
                        </p>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-dim uppercase mt-1.5">
                            {formatEventDate(event.date)}
                        </p>
                        <p className="font-mono text-[9px] tracking-[0.2em] text-ghost uppercase mt-0.5">
                            {event.venue} · {event.city}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
}
