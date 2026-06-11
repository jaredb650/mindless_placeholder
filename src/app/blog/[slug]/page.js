import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import GlitchImage from "@/components/GlitchImage";
import Reveal from "@/components/Reveal";
import { getAllPosts, getPost, formatPostDate } from "@/lib/blog";

export function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author ?? "MINDLESS"],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { "@type": "Organization", name: post.author ?? "MINDLESS" },
        publisher: {
            "@type": "Organization",
            name: "Mindless Entertainment",
            logo: {
                "@type": "ImageObject",
                url: "https://mindless.pr/brand/mindlessIcon.png",
            },
        },
        mainEntityOfPage: `https://mindless.pr/blog/${slug}`,
    };

    return (
        <div className="pt-32 md:pt-40 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <article className="mx-auto max-w-3xl px-4 md:px-8">
                <Reveal>
                    <Link
                        href="/blog"
                        className="font-mono text-[11px] tracking-[0.3em] text-ghost hover:text-volt uppercase transition-colors"
                    >
                        ← La Crónica
                    </Link>

                    <div className="flex items-center gap-4 mt-8 mb-5 font-mono text-[11px] tracking-[0.25em] uppercase">
                        <span className="text-ice">{formatPostDate(post.date)}</span>
                        {post.tag && (
                            <span className="text-volt border border-volt/40 px-2 py-0.5">
                                {post.tag}
                            </span>
                        )}
                        {post.author && <span className="text-ghost">BY {post.author}</span>}
                    </div>

                    <h1 className="pixel uppercase leading-[1.05] text-3xl md:text-5xl">
                        {post.title}
                    </h1>
                </Reveal>

                {post.cover && (
                    <Reveal delay={0.1}>
                        <GlitchImage
                            src={post.cover}
                            alt=""
                            className="aspect-[16/9] w-full mt-10 border border-line"
                        />
                    </Reveal>
                )}

                <Reveal delay={0.15}>
                    <div className="prose-mindless mt-10 font-sans text-base">
                        <MDXRemote source={post.content} />
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="mt-16 pt-8 border-t border-line flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-ghost uppercase">
                            ▮ End of transmission
                        </span>
                        <Link
                            href="/blog"
                            className="font-mono text-[11px] tracking-[0.3em] text-dim hover:text-volt uppercase transition-colors"
                        >
                            More articles →
                        </Link>
                    </div>
                </Reveal>
            </article>
        </div>
    );
}
