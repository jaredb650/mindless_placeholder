import "./globals.css";
import { Bricolage_Grotesque, Silkscreen, Space_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MatrixPreloader from "@/components/MatrixPreloader";
import { site } from "@/data/site";

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-bricolage",
    display: "swap",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
    variable: "--font-space-mono",
    display: "swap",
});

const silkscreen = Silkscreen({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-silkscreen",
    display: "swap",
});

export const metadata = {
    metadataBase: new URL("https://mindless.pr"),
    title: {
        default: "MINDLESS — Hard Techno & Alt Events · Puerto Rico",
        template: "%s · MINDLESS",
    },
    description: site.description,
    applicationName: "MINDLESS.PR",
    authors: [{ name: "Mindless Entertainment", url: "https://mindless.pr" }],
    creator: "Mindless Entertainment",
    publisher: "Mindless Entertainment",
    category: "music",
    keywords: [
        "Mindless Entertainment",
        "hard techno",
        "Puerto Rico",
        "San Juan",
        "Santurce",
        "raves",
        "techno events Puerto Rico",
        "punk",
        "nu metal",
        "alternative",
        "underground events",
        "Dimensions",
        "mindless.pr",
    ],
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        title: "MINDLESS — Hard Techno & Alt Events · Puerto Rico",
        description: site.description,
        url: "https://mindless.pr",
        siteName: "Mindless Entertainment",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MINDLESS — Hard Techno & Alt Events · Puerto Rico",
        description: site.description,
    },
    formatDetection: {
        telephone: false,
    },
};

export const viewport = {
    themeColor: "#05050a",
    colorScheme: "dark",
};

// Organization schema — tells Google who MINDLESS is and links
// the socials as the same entity.
const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mindless Entertainment",
    alternateName: "MINDLESS.PR",
    url: "https://mindless.pr",
    logo: "https://mindless.pr/brand/mindlessIcon.png",
    description: site.description,
    foundingDate: "2023",
    email: site.email,
    address: {
        "@type": "PostalAddress",
        addressLocality: "San Juan",
        addressRegion: "PR",
        addressCountry: "PR",
    },
    sameAs: [
        "https://www.instagram.com/mindlessentertainmenttv/",
        "https://www.youtube.com/@MindlessEntertainmentTV",
        "https://www.tiktok.com/@mindlessentertainmenttv",
        "https://www.threads.com/@mindlessentertainmenttv",
        "https://www.facebook.com/mestandsformindlessentertainment/",
    ],
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${bricolage.variable} ${spaceMono.variable} ${silkscreen.variable}`}
        >
            <body className="antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
                />
                <MatrixPreloader />
                <Header />
                <main className="relative z-10 min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
