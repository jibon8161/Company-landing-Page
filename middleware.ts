// middleware.ts (alternative if import fails)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use dynamic import to avoid TypeScript issues
const killSwitchModule = require("./src/app/lib/githubKillSwitch");
const killSwitchManager = killSwitchModule.killSwitchManager;

// Paths that should bypass the kill switch
const BYPASS_PATHS = [
  "/api/health",
  "/api/kill-switch-status",
  "/api/test-kill-switch",
  "_next",
  "/favicon.ico",
  "/public",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if this path should bypass kill switch
  const shouldBypass = BYPASS_PATHS.some((path) => pathname.startsWith(path));

  if (shouldBypass) {
    return NextResponse.next();
  }

  // Skip files with extensions (images, css, js)
  if (pathname.match(/\.(jpg|jpeg|png|gif|ico|css|js|svg)$/)) {
    return NextResponse.next();
  }

  try {
    // Check kill switch status
    const status = await killSwitchManager.checkStatus();

    // If kill switch is active, redirect
    if (status.enabled && status.redirectUrl) {
      console.log(`Kill switch active. Redirecting to: ${status.redirectUrl}`);

      // Create redirect response
      const redirectUrl = new URL(status.redirectUrl);

      // Preserve original URL as query parameter (optional)
      redirectUrl.searchParams.set("from", request.nextUrl.toString());

      // Add kill switch message (optional)
      if (status.message) {
        redirectUrl.searchParams.set("message", status.message);
      }

      return NextResponse.redirect(redirectUrl, 307);
    }
  } catch (error) {
    console.error("Kill switch middleware error:", error);
    // Continue if we can't check status
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
