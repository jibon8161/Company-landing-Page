// src/app/api/debug/route.js
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    // Check ALL environment variables
    BREVO_API_KEY: process.env.BREVO_API_KEY ? "✅ Set" : "❌ Missing",
    GOOGLE_SHEET_CONTACT_WEBHOOK: process.env.GOOGLE_SHEET_CONTACT_WEBHOOK
      ? "✅ Set"
      : "❌ Missing",
    GOOGLE_SHEET_CONSULTATION_WEBHOOK: process.env
      .GOOGLE_SHEET_CONSULTATION_WEBHOOK
      ? "✅ Set"
      : "❌ Missing",
    GOOGLE_SHEET_WEBHOOK: process.env.GOOGLE_SHEET_WEBHOOK
      ? "✅ Set"
      : "❌ Missing",

    // Check if API routes exist
    routes: {
      contact: "✅ /api/contact",
      consultation: "✅ /api/consultation",
      test: "✅ /api/test",
    },
  });
}
