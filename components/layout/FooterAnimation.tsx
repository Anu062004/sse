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
    <div className="relative mx-auto aspect-video w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/15 bg-navy md:mx-0 md:justify-self-end">
      <video
        ref={videoRef}
        src="/videos/footer-earthmoving.mp4"
        poster="/videos/footer-earthmoving-poster.webp"
        width={480}
        height={270}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
      {!failed ? (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play footer animation" : "Pause footer animation"}
          className="absolute bottom-3 right-3 min-h-11 rounded-full border border-white/30 bg-ink/85 px-4 text-xs font-semibold text-white transition-colors hover:bg-ink motion-reduce:hidden"
        >
          {paused ? "Play" : "Pause"}
        </button>
      ) : null}
    </div>
  );
}
