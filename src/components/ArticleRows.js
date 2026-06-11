import Link from "next/link";
import { formatPostDate } from "@/lib/blog";
import ScrambleText from "@/components/ScrambleText";

/** Blog index as an editorial ledger — numbered rows, no cards. */
export default function ArticleRows({ posts }) {
    return (
        <ul className="border-t border-line">
            {posts.map((post, i) => (
                <li key={post.slug}>
                    <Link
                        href={`/blog/${post.slug}`}

                        className="row-sweep group grid grid-cols-[auto_1fr] lg:grid-cols-[80px_1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 md:py-8 px-2 md:px-4 border-b border-line"
                    >
                        <span className="font-mono text-[10px] md:text-xs text-ghost tracking-[0.2em]">
                            {String(i + 1).padStart(3, "0")}
                        </span>
                        <span className="min-w-0">
                            <ScrambleText
                                rescramble
                                className="pixel uppercase leading-[1.1] text-lg md:text-2xl lg:text-3xl text-bone group-hover:text-volt transition-colors block"
                            >
                                {post.title}
                            </ScrambleText>
                            {post.excerpt && (
                                <span className="block font-sans text-sm text-dim mt-2 max-w-2xl leading-relaxed">
                                    {post.excerpt}
                                </span>
                            )}
                        </span>
                        <span className="justify-self-end text-right font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase col-start-2 lg:col-start-3">
                            <span className="text-ice block">{formatPostDate(post.date)}</span>
                            {post.tag && (
                                <span className="text-volt block mt-1">[{post.tag}]</span>
                            )}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
