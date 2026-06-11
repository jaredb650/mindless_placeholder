"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * GlitchImage — WebGL slice-displacement + RGB-split on hover.
 * The CRT DNA of the brand, matured: photos tear like a bad
 * transmission when touched.
 *
 * - No src → "awaiting transmission" placeholder panel.
 * - No WebGL / reduced motion → plain <img> with CSS hover.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform float u_intensity;
uniform vec2 u_cover; // cover-fit scale
float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
  vec2 uv = (v_uv - 0.5) * u_cover + 0.5;

  // horizontal slice tear
  float bands = 14.0;
  float band = floor(uv.y * bands + u_time * 7.0);
  float jolt = (rand(vec2(band, floor(u_time * 9.0))) - 0.5);
  float gate = step(0.6, rand(vec2(band, floor(u_time * 5.0) + 4.0)));
  float shift = jolt * gate * 0.12 * u_intensity;

  // occasional vertical roll
  float roll = gate * jolt * 0.02 * u_intensity;

  vec2 uvR = uv + vec2(shift + 0.008 * u_intensity, roll);
  vec2 uvG = uv + vec2(shift * 0.5, 0.0);
  vec2 uvB = uv + vec2(shift - 0.008 * u_intensity, -roll);

  float r = texture2D(u_tex, clamp(uvR, 0.0, 1.0)).r;
  float g = texture2D(u_tex, clamp(uvG, 0.0, 1.0)).g;
  float b = texture2D(u_tex, clamp(uvB, 0.0, 1.0)).b;

  // scanline darkening, always subtly present
  float scan = 1.0 - 0.06 * step(0.5, fract(gl_FragCoord.y * 0.5));

  // blue cast deepens with intensity
  vec3 col = vec3(r, g, b) * scan;
  col = mix(col, col * vec3(0.85, 0.95, 1.25), 0.25 * u_intensity);

  gl_FragColor = vec4(col, 1.0);
}
`;

function Placeholder({ label = "AWAITING TRANSMISSION", className = "" }) {
    return (
        <div
            className={`relative overflow-hidden bg-panel border border-line flex items-center justify-center ${className}`}
        >
            <img
                src="/icon-tight.png"
                alt=""
                className="w-1/3 max-w-[120px] opacity-[0.12] grayscale select-none"
                draggable={false}
            />
            <div className="absolute inset-0 tv-scanlines" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.2em] text-ghost">
                ▒ {label}
            </span>
        </div>
    );
}

export default function GlitchImage({ src, alt = "", className = "", label }) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const stateRef = useRef({ intensity: 0, target: 0, raf: 0, time: 0 });
    const [webglOk, setWebglOk] = useState(true);

    const setTarget = useCallback((v) => {
        const s = stateRef.current;
        s.target = v;
        if (s.kick) s.kick();
    }, []);

    useEffect(() => {
        if (!src) return;
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setWebglOk(false);
            return;
        }

        const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
        if (!gl) {
            setWebglOk(false);
            return;
        }

        const compile = (type, srcCode) => {
            const sh = gl.createShader(type);
            gl.shaderSource(sh, srcCode);
            gl.compileShader(sh);
            return sh;
        };
        const prog = gl.createProgram();
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            setWebglOk(false);
            return;
        }
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW
        );
        const loc = gl.getAttribLocation(prog, "a_pos");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, "u_time");
        const uIntensity = gl.getUniformLocation(prog, "u_intensity");
        const uCover = gl.getUniformLocation(prog, "u_cover");

        const tex = gl.createTexture();
        let imgAspect = 1;
        let ready = false;

        const img = new Image();
        img.onload = () => {
            imgAspect = img.naturalWidth / img.naturalHeight;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            ready = true;
            resize();
            kick();
        };
        img.onerror = () => setWebglOk(false);
        img.src = src;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = wrap.clientWidth;
            const h = wrap.clientHeight;
            if (!w || !h) return;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            // cover-fit: sample a sub-window of the texture with the
            // canvas's aspect ratio (crop, never stretch)
            const canvasAspect = w / h;
            let cx = 1, cy = 1;
            if (canvasAspect > imgAspect) cy = imgAspect / canvasAspect;
            else cx = canvasAspect / imgAspect;
            gl.uniform2f(uCover, cx, cy);
            drawFrame();
        };

        const s = stateRef.current;

        function drawFrame() {
            if (!ready) return;
            gl.uniform1f(uTime, s.time);
            gl.uniform1f(uIntensity, s.intensity);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        let running = false;
        let lastT = 0;
        function loop(t) {
            const dt = Math.min((t - lastT) / 1000, 0.05);
            lastT = t;
            s.time = t / 1000;
            // ease intensity toward target
            s.intensity += (s.target - s.intensity) * Math.min(dt * 10, 1);
            drawFrame();
            if (s.target > 0.001 || s.intensity > 0.005) {
                s.raf = requestAnimationFrame(loop);
            } else {
                s.intensity = 0;
                drawFrame();
                running = false;
            }
        }

        function kick() {
            if (running || !ready) return;
            running = true;
            lastT = performance.now();
            s.raf = requestAnimationFrame(loop);
        }
        s.kick = kick;

        const ro = new ResizeObserver(resize);
        ro.observe(wrap);

        return () => {
            cancelAnimationFrame(s.raf);
            ro.disconnect();
            gl.deleteTexture(tex);
            gl.deleteProgram(prog);
            gl.deleteBuffer(buf);
            s.kick = null;
        };
    }, [src]);

    if (!src) {
        return <Placeholder label={label} className={className} />;
    }

    if (!webglOk) {
        return (
            <div className={`img-glitch ${className}`}>
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
        );
    }

    return (
        <div
            ref={wrapRef}
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setTarget(1)}
            onMouseLeave={() => setTarget(0)}
            onTouchStart={() => {
                setTarget(1);
                setTimeout(() => setTarget(0), 700);
            }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            {/* keep an accessible img for SEO/screen readers */}
            <img src={src} alt={alt} className="sr-only" />
        </div>
    );
}
