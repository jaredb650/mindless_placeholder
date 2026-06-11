import SectionHeading from "@/components/SectionHeading";
import VideoDeck from "@/components/VideoDeck";
import Reveal from "@/components/Reveal";
import { allVideos } from "@/data/videos";
import { socials } from "@/data/site";

export const metadata = {
    title: "Video Archive",
    description:
        "Aftermovies and recaps from Mindless Entertainment — hard techno raves and alt/punk shows across Puerto Rico, on video.",
    alternates: { canonical: "/videos" },
};

export default function VideosPage() {
    const videos = allVideos();
    const yt = socials.find((s) => s.label === "YouTube");

    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Reveal>
                    <SectionHeading
                        index="03"
                        kicker="ARCHIVO"
                        title="On Air"
                        right={
                            <a
                                href={yt?.href}
                                target="_blank"
                                rel="noopener noreferrer"

                                className="font-mono text-[11px] tracking-[0.3em] text-dim hover:text-volt uppercase transition-colors"
                            >
                                YouTube channel ↗
                            </a>
                        }
                    />
                    <p className="font-sans text-dim max-w-2xl -mt-4 mb-12">
                        We film the island&apos;s underground — our raves, our shows, and the
                        scene around them. The archive lives here and on YouTube.
                    </p>
                </Reveal>
                <VideoDeck videos={videos} />
            </div>
        </div>
    );
}
