import Link from "next/link";
import GlitchText from "@/components/GlitchText";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <p className="font-mono text-[11px] tracking-[0.35em] text-danger uppercase mb-6">
                <span className="blink">●</span> Señal perdida
            </p>
            <h1 className="pixel uppercase text-[24vw] md:text-[10rem] leading-none">
                <GlitchText ambient>404</GlitchText>
            </h1>
            <p className="font-mono text-xs text-ghost tracking-[0.2em] uppercase mt-4 mb-10">
                ▒▒ This frequency doesn&apos;t exist ▒▒
            </p>
            <Link
                href="/"
                className="btn-ghost-blue font-mono text-xs tracking-[0.3em] uppercase px-8 py-4"
            >
                ← Back home
            </Link>
        </div>
    );
}
