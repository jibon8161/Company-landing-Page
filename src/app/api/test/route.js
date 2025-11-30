// src/app/api/test/route.js
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "API is working",
    environment: process.env.NODE_ENV,
    hasBrevoKey: !!process.env.BREVO_API_KEY,
    hasContactWebhook: !!process.env.GOOGLE_SHEET_CONTACT_WEBHOOK,
    hasConsultationWebhook: !!process.env.GOOGLE_SHEET_CONSULTATION_WEBHOOK,
    timestamp: new Date().toISOString(),
  });
}
