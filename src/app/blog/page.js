import SectionHeading from "@/components/SectionHeading";
import ArticleRows from "@/components/ArticleRows";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
    title: "Blog",
    description:
        "Interviews, recaps, and lore from the Mindless Entertainment crew — stories from Puerto Rico's underground.",
    alternates: { canonical: "/blog" },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="pt-32 md:pt-40 pb-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <Reveal>
                    <SectionHeading index="04" kicker="LA CRÓNICA" title="The Chronicle" />
                    <p className="font-sans text-dim max-w-2xl -mt-4 mb-12">
                        The written record — resident interviews, event recaps, and
                        stories from the floor. This is where the lore gets archived.
                    </p>
                </Reveal>

                {posts.length > 0 ? (
                    <ArticleRows posts={posts} />
                ) : (
                    <p className="font-mono text-xs text-ghost tracking-[0.2em] uppercase">
                        ▒ First transmission being written
                    </p>
                )}
            </div>
        </div>
    );
}
