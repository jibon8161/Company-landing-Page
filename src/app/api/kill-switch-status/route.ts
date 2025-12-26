// src/app/api/kill-switch-status/route.ts
import { NextResponse } from "next/server";
const { killSwitchManager } = require("../../lib/githubKillSwitch");

export async function GET() {
  const status = await killSwitchManager.checkStatus();

  return NextResponse.json({
    killSwitch: status,
    serverTime: new Date().toISOString(),
    cacheInfo: {
      hasCache: (killSwitchManager as any).cache !== null,
      age: (killSwitchManager as any).cache
        ? Date.now() - (killSwitchManager as any).cache.timestamp
        : null,
    },
  });
}
