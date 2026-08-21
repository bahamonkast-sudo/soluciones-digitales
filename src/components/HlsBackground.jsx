import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function HlsBackground() {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  // URL de video HLS pública y de alto rendimiento (.m3u8)
  const hlsUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Auto-play was blocked or failed
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setHasError(true);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native support (Safari / iOS Chrome)
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
      video.addEventListener('error', () => {
        setHasError(true);
      });
    } else {
      setHasError(true);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  if (hasError) {
    // Fallback con fondo futurista animado en CSS si falla la red o el stream
    return (
      <div className="absolute inset-0 bg-neutral-950 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_50%)] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-neutral-950">
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-25 filter grayscale contrast-125 brightness-75"
        muted
        loop
        playsInline
        autoPlay
      />
      {/* Overlay para oscurecer y mejorar contraste con el contenido */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-neutral-950" />
    </div>
  );
}
