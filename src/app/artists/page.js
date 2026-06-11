import SectionHeading from "@/components/SectionHeading";
import ResidentsRoster from "@/components/ResidentsRoster";
import Reveal from "@/components/Reveal";
import { artists } from "@/data/artists";

export const metadata = {
    title: "Resident Artists",
    description:
        "The Mindless Entertainment residents — the DJs and live acts behind Puerto Rico's hard techno and alt/punk underground.",
    alternates: { canonical: "/artists" },
};

export default function ArtistsPage() {
    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Reveal>
                    <SectionHeading index="02" kicker="RESIDENTES" title="The Lineup" />
                    <p className="font-sans text-dim max-w-2xl -mt-4 mb-12">
                        The roster. DJs on the techno side, bands and live acts on the
                        alt/punk side — the people who build the Mindless sound.
                    </p>
                </Reveal>
                <ResidentsRoster artists={artists} />
            </div>
        </div>
    );
}
