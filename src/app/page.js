"use client";

import Preloader from "@/components/Preloader";

export default function Home() {
    // Always show the preloader for the coming soon page
    return (
        <main className="min-h-screen bg-black">
            <Preloader isLoading={true} />
        </main>
    );
}
