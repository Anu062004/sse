"use client";

import { useEffect, useRef, useState } from "react";

export function FooterAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    const syncPlayback = () => {
      if (visible && !paused && !motion.matches && !document.hidden) {
        void video.play().catch((error: DOMException) => {
          if (!disposed && error.name === "NotAllowedError") setPaused(true);
        });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });

    observer.observe(video);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [paused, failed]);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src="/videos/footer-earthmoving.mp4"
        poster="/videos/footer-earthmoving-poster.webp"
        width={960}
        height={540}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,19,45,0.88)_0%,rgba(9,19,45,0.5)_55%,rgba(9,19,45,0.18)_100%),linear-gradient(0deg,#09132d_0%,transparent_45%)]"
      />
      {!failed ? (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play footer animation" : "Pause footer animation"}
          className="absolute bottom-5 right-gutter z-20 min-h-11 rounded-full border border-white/30 bg-ink/85 px-4 text-xs font-semibold text-white transition-colors hover:bg-ink motion-reduce:hidden"
        >
          {paused ? "Play" : "Pause"}
        </button>
      ) : null}
    </div>
  );
}
