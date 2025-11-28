"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const isMobileDevice = () =>
  typeof navigator !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent);

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = resolvedTheme || theme;
  const vantaInstanceRef = useRef<any>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !vantaRef.current) return;

    const mobile = isMobileDevice();

    const destroyVanta = () => {
      if (vantaInstanceRef.current?.destroy) {
        vantaInstanceRef.current.destroy();
        vantaInstanceRef.current = null;
      }
    };

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load " + src));
        document.head.appendChild(s);
      });

    const initVanta = () => {
      if (!vantaRef.current) return;
      destroyVanta();

      const optionsCommon = {
        el: vantaRef.current,
        mouseControls: !mobile,
        touchControls: !mobile,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
      };

      try {
        if ((window as any).VANTA?.TOPOLOGY) {
          const topoOpts = {
            ...optionsCommon,
            scale: 1.0,
            scaleMobile: mobile ? 0.5 : 1.0,
            backgroundColor: currentTheme === "dark" ? 0x002222 : 0xdbf0dd, // Light green background for light mode
            color: currentTheme === "dark" ? 0x808e46 : 0x8db398, // Sage green lines for light mode
            color2: currentTheme === "dark" ? 0x808e46 : 0x8db398, // Same sage green for secondary lines
          };
          vantaInstanceRef.current = (window as any).VANTA.TOPOLOGY(topoOpts);
        }
      } catch (err) {
        console.warn("Vanta init failed:", err);
      }
    };

    const loadAllScripts = async () => {
      try {
        // Topology requires p5.js
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js"
        );

        setTimeout(initVanta, 50);
      } catch (err) {
        console.warn("Failed loading Vanta scripts:", err);
      }
    };

    loadAllScripts();

    const handleResize = () => {
      initVanta();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      destroyVanta();
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, currentTheme]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-50 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default VantaBackground;
