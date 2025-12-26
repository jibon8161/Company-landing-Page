// src/components/KillSwitchClientCheck.tsx
"use client";

import { useEffect } from "react";

export default function KillSwitchClientCheck() {
  useEffect(() => {
    const checkKillSwitch = async () => {
      try {
        const response = await fetch("/api/kill-switch-status", {
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();

          if (data.killSwitch.enabled && data.killSwitch.redirectUrl) {
            // Client-side redirect as backup
            console.log("Client-side kill switch triggered");
            window.location.href = data.killSwitch.redirectUrl;
          }
        }
      } catch (error) {
        console.error("Client-side kill switch check failed:", error);
      }
    };

    // Check on mount
    checkKillSwitch();

    // Check every 30 seconds as backup
    const interval = setInterval(checkKillSwitch, 30000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
