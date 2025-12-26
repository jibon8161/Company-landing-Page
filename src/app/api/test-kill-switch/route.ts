// src/app/api/test-kill-switch/route.ts
import { NextResponse } from "next/server";
const { killSwitchManager } = require("../../lib/githubKillSwitch");

export async function GET() {
  const status = await killSwitchManager.checkStatus();

  return NextResponse.json({
    test: "Kill Switch Test",
    currentStatus: status,
    instructions: {
      activate: 'Set "killSwitch": true in your GitHub Gist',
      deactivate: 'Set "killSwitch": false in your GitHub Gist',
      changeRedirect: 'Update "redirectUrl" in your GitHub Gist',
    },
    gistUrl:
      "https://gist.github.com/jibon8161/4995d64b8c27d3f5fece51d09e371b5f",
  });
}
