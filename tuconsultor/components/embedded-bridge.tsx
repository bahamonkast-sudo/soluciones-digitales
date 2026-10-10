"use client";

import { useEffect } from "react";

export default function EmbeddedBridge() {
  useEffect(() => {
    if (window.parent === window) return;
    document.body.classList.add("websd-embedded");

    const targetOrigin = document.referrer ? new URL(document.referrer).origin : "*";
    const notifyParent = () => {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight,
      );
      window.parent.postMessage({ type: "tuconsultor:resize", height }, targetOrigin);
    };

    notifyParent();
    const resizeObserver = new ResizeObserver(notifyParent);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    const mutationObserver = new MutationObserver(notifyParent);
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
    window.addEventListener("load", notifyParent);
    window.addEventListener("resize", notifyParent);
    document.fonts?.ready.then(notifyParent).catch(() => {});

    return () => {
      document.body.classList.remove("websd-embedded");
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("load", notifyParent);
      window.removeEventListener("resize", notifyParent);
    };
  }, []);

  return null;
}

