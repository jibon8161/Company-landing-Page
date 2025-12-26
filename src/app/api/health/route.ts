// app/api/health/route.ts
import { NextResponse } from "next/server";
import { killSwitchManager } from "@/app/lib/githubKillSwitch";

export async function GET() {
  const status = await killSwitchManager.checkStatus();

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    killSwitch: {
      enabled: status.enabled,
      lastChecked: new Date().toISOString(),
      gistUrl: process.env.KILL_SWITCH_GIST_URL || "Using default",
    },
  });
}
