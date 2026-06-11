import { socials } from "@/data/site";

/** Mono-chrome social rail. size: "sm" | "lg" */
export default function SocialLinks({ size = "sm", className = "" }) {
    if (size === "lg") {
        return (
            <ul className={`divide-y divide-line border-y border-line ${className}`}>
                {socials.map((s) => (
                    <li key={s.label}>
                        <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"

                            className="row-sweep group flex items-baseline justify-between py-5 px-1 transition-colors"
                        >
                            <span className="pixel text-xl md:text-3xl uppercase group-hover:text-volt transition-colors">
                                {s.label}
                                {s.primary && (
                                    <span className="ml-3 align-middle font-mono text-[10px] tracking-[0.25em] text-danger">
                                        ● MAIN
                                    </span>
                                )}
                            </span>
                            <span className="font-mono text-xs text-dim group-hover:text-ice transition-colors">
                                {s.handle} ↗
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
            {socials.map((s) => (
                <li key={s.label}>
                    <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-[0.15em] text-dim hover:text-volt transition-colors uppercase"
                    >
                        {s.label} ↗
                    </a>
                </li>
            ))}
        </ul>
    );
}
