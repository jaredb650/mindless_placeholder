"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Preloader({ isLoading }) {
    const canvasRef = useRef(null);
    const grainCanvasRef = useRef(null);
    const staticCanvasRef = useRef(null);

    // Typewriter state
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const fullText = "COMING SOON";

    // Store displayedText in a ref so canvas can access current value
    const displayedTextRef = useRef(displayedText);
    useEffect(() => {
        displayedTextRef.current = displayedText;
    }, [displayedText]);

    // Detect mobile for performance optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Typewriter Effect
    useEffect(() => {
        if (!isLoading) return;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 500;

        let timeout;

        if (isTyping) {
            if (displayedText.length < fullText.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(fullText.slice(0, displayedText.length + 1));
                }, typeSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, pauseAfterType);
            }
        } else {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(displayedText.slice(0, -1));
                }, deleteSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(true);
                }, pauseAfterDelete);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isTyping, isLoading]);

    // Grain/static effect on logo - optimized with RAF
    useEffect(() => {
        const canvas = grainCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = 320;
        canvas.height = 320;

        let animationId;
        let lastTime = 0;
        const interval = isMobile ? 100 : 50; // Slower on mobile

        const drawGrain = (timestamp) => {
            if (timestamp - lastTime >= interval) {
                const imageData = ctx.createImageData(canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const grain = Math.random() * 30 - 15;
                    data[i] = 128 + grain;
                    data[i + 1] = 128 + grain;
                    data[i + 2] = 128 + grain;
                    data[i + 3] = 20;
                }

                ctx.putImageData(imageData, 0, 0);
                lastTime = timestamp;
            }
            animationId = requestAnimationFrame(drawGrain);
        };

        animationId = requestAnimationFrame(drawGrain);
        return () => cancelAnimationFrame(animationId);
    }, [isMobile]);

    // TV Static overlay effect - optimized with RAF and reduced resolution on mobile
    useEffect(() => {
        const canvas = staticCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const scale = isMobile ? 0.5 : 1; // Half resolution on mobile

        const resizeCanvas = () => {
            canvas.width = window.innerWidth * scale;
            canvas.height = window.innerHeight * scale;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationId;
        let lastTime = 0;
        const interval = isMobile ? 100 : 50; // Slower on mobile

        const drawStatic = (timestamp) => {
            if (timestamp - lastTime >= interval) {
                const imageData = ctx.createImageData(canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const noise = Math.random() * 255;
                    data[i] = noise;
                    data[i + 1] = noise;
                    data[i + 2] = noise;
                    data[i + 3] = 255;
                }

                ctx.putImageData(imageData, 0, 0);
                lastTime = timestamp;
            }
            animationId = requestAnimationFrame(drawStatic);
        };

        animationId = requestAnimationFrame(drawStatic);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [isMobile]);

    // Matrix Rain Canvas with Text Distortion - optimized with RAF
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // Offscreen canvases for text rendering
        const logoTextCanvas = document.createElement("canvas");
        const logoTextCtx = logoTextCanvas.getContext("2d");
        const comingTextCanvas = document.createElement("canvas");
        const comingTextCtx = comingTextCanvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Matrix Config - larger font on mobile = fewer columns = better perf
        const fontSize = isMobile ? 20 : 16;
        let columns = Math.ceil(canvas.width / fontSize);
        let drops = Array(columns).fill(1);
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        let animationId;
        let lastTime = 0;
        const interval = isMobile ? 50 : 33; // ~20fps on mobile, ~30fps on desktop

        const draw = (timestamp) => {
            if (timestamp - lastTime >= interval) {
                // Fade out trail
                ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Recalculate columns on resize
                const newColumns = Math.ceil(canvas.width / fontSize);
                if (newColumns !== columns) {
                    columns = newColumns;
                    drops = Array(columns).fill(1);
                }

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                // Text positioning - BELOW the logo
                const logoFontSize = canvas.width >= 768 ? 42 : 28;
                const comingFontSize = canvas.width >= 768 ? 14 : 12;
                const logoY = centerY + 160;
                const comingY = centerY + 200;

                // Prepare logo text on offscreen canvas
                logoTextCanvas.width = 600;
                logoTextCanvas.height = logoFontSize + 20;
                logoTextCtx.clearRect(0, 0, logoTextCanvas.width, logoTextCanvas.height);
                logoTextCtx.font = `800 ${logoFontSize}px "Bricolage Grotesque", sans-serif`;
                logoTextCtx.textBaseline = "top";

                // Draw MINDLESS in white
                logoTextCtx.fillStyle = "#FFFFFF";
                const mindlessWidth = logoTextCtx.measureText("MINDLESS").width;
                logoTextCtx.fillText("MINDLESS", 10, 0);

                // Draw .PR in blue
                logoTextCtx.fillStyle = "#3B82F6";
                logoTextCtx.fillText(".PR", mindlessWidth + 10, 0);

                const totalLogoWidth = logoTextCtx.measureText("MINDLESS.PR").width;
                const logoStartX = centerX - totalLogoWidth / 2 - 10;

                // Prepare coming soon text with TYPEWRITER effect
                const currentText = "> " + displayedTextRef.current + "_";
                comingTextCanvas.width = 300;
                comingTextCanvas.height = comingFontSize + 10;
                comingTextCtx.clearRect(0, 0, comingTextCanvas.width, comingTextCanvas.height);
                comingTextCtx.font = `400 ${comingFontSize}px "Space Mono", monospace`;
                comingTextCtx.textBaseline = "top";
                comingTextCtx.fillStyle = "#60A5FA";
                comingTextCtx.fillText(currentText, 5, 0);

                const comingWidth = comingTextCtx.measureText(currentText).width;
                const comingStartX = centerX - comingWidth / 2;

                ctx.font = `${fontSize}px monospace`;

                // Draw matrix rain and distorted text
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    const dropX = i * fontSize;
                    const dropY = drops[i] * fontSize;

                    // --- LOGO TEXT DISTORTION (column by column) ---
                    if (dropX >= logoStartX && dropX < logoStartX + totalLogoWidth + 20) {
                        const relativeX = dropX - logoStartX;
                        const srcX = relativeX;
                        const srcW = fontSize;

                        // Draw base column (undistorted)
                        ctx.drawImage(
                            logoTextCanvas,
                            srcX, 0, srcW, logoTextCanvas.height,
                            dropX, logoY - logoFontSize, srcW, logoTextCanvas.height
                        );

                        // Draw distorted tear where drop passes
                        const textTop = logoY - logoFontSize;
                        const textBottom = logoY + 10;
                        const isOverText = dropY > textTop - fontSize && dropY < textBottom;

                        if (isOverText) {
                            const bandHeight = fontSize * 2;
                            const relY = dropY - textTop;
                            const sY = Math.max(0, relY);
                            const sH = Math.min(logoTextCanvas.height - sY, bandHeight);

                            if (sH > 0 && sY < logoTextCanvas.height) {
                                const offsetX = (Math.random() - 0.5) * 12;
                                ctx.drawImage(
                                    logoTextCanvas,
                                    srcX, sY, srcW, sH,
                                    dropX + offsetX, textTop + sY, srcW, sH
                                );
                            }
                        }
                    }

                    // --- COMING SOON TEXT DISTORTION ---
                    if (dropX >= comingStartX - 10 && dropX < comingStartX + comingWidth + 10) {
                        const relativeX = dropX - comingStartX + 10;
                        const srcX = relativeX;
                        const srcW = fontSize;

                        // Draw base column
                        if (srcX >= 0 && srcX < comingTextCanvas.width) {
                            ctx.drawImage(
                                comingTextCanvas,
                                srcX, 0, srcW, comingTextCanvas.height,
                                dropX, comingY - comingFontSize, srcW, comingTextCanvas.height
                            );

                            // Draw distorted tear
                            const textTop = comingY - comingFontSize;
                            const textBottom = comingY + 5;
                            const isOverText = dropY > textTop - fontSize && dropY < textBottom;

                            if (isOverText) {
                                const bandHeight = fontSize * 1.5;
                                const relY = dropY - textTop;
                                const sY = Math.max(0, relY);
                                const sH = Math.min(comingTextCanvas.height - sY, bandHeight);

                                if (sH > 0 && sY < comingTextCanvas.height) {
                                    const offsetX = (Math.random() - 0.5) * 8;
                                    ctx.drawImage(
                                        comingTextCanvas,
                                        srcX, sY, srcW, sH,
                                        dropX + offsetX, textTop + sY, srcW, sH
                                    );
                                }
                            }
                        }
                    }

                    // --- MATRIX RAIN ---
                    if (Math.random() > 0.98) ctx.fillStyle = "#FFFFFF";
                    else ctx.fillStyle = "#60A5FA";

                    ctx.fillText(text, dropX, dropY);

                    if (dropY > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }

                lastTime = timestamp;
            }
            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [isMobile]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -100,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
                >
                    {/* Matrix Rain + Text Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 z-10"
                    />

                    {/* Animated Logo with CSS Glitch + Grain Effect */}
                    <div className="relative z-20 flex flex-col items-center justify-center -mt-32">
                        <div className="relative glitch-single">
                            <img
                                src="/animation.webp"
                                alt="mindless.pr"
                                className="w-48 md:w-64 lg:w-80 h-auto opacity-90"
                                loading="eager"
                                fetchPriority="high"
                            />
                            {/* Grain overlay on logo */}
                            <canvas
                                ref={grainCanvasRef}
                                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-30"
                            />
                        </div>
                    </div>

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 z-30 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat animate-[scanline_10s_linear_infinite]" />

                    {/* TV Static Overlay - on top of everything */}
                    <canvas
                        ref={staticCanvasRef}
                        className="absolute inset-0 z-40 pointer-events-none opacity-[0.08]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
