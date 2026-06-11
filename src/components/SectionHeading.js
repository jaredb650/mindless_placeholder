import ScrambleText from "@/components/ScrambleText";

/**
 * Broadcast-style section header:
 *   ▸ 02 // RESIDENTES
 *   RESIDENT ARTISTS   ← decrypts into place on scroll
 */
export default function SectionHeading({ index, kicker, title, right = null }) {
    return (
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
                <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-volt mb-3">
                    ▸ {index} <span className="text-ghost">{"//"}</span>{" "}
                    <span className="text-dim">{kicker}</span>
                </p>
                <h2 className="pixel text-3xl md:text-5xl leading-[0.95] uppercase">
                    <ScrambleText duration={900}>{title}</ScrambleText>
                </h2>
            </div>
            {right && <div className="hidden md:block shrink-0">{right}</div>}
        </div>
    );
}
