import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Same banner for X/Twitter cards.
export const runtime = "nodejs";
export const alt = "MINDLESS — Hard Techno & Alt Events · Puerto Rico";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
    const skull = await readFile(join(process.cwd(), "public/brand/skull-bw.png"));
    const skullSrc = `data:image/png;base64,${skull.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000000",
                }}
            >
                <img src={skullSrc} alt="" width={420} height={420} />
            </div>
        ),
        size
    );
}
