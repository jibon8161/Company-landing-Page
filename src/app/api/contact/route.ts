export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  UserConfirmationEmail,
  AdminNotificationEmail,
} from "@/components/EmailTemplates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

    /** --------------------------------------------
     * 1. ADD CONTACT TO BREVO
     -------------------------------------------- */
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY ?? "",
      },
      body: JSON.stringify({
        email: body.email,
        attributes: {
          FIRSTNAME: body.firstName,
          LASTNAME: body.lastName,
          COUNTRY: body.country,
          MESSAGE: body.message,
        },
        updateEnabled: true,
      }),
    });

    /** --------------------------------------------
     * 2. GOOGLE SHEET WEBHOOK
     -------------------------------------------- */
    if (process.env.GOOGLE_SHEET_CONTACT_WEBHOOK) {
      try {
        await fetch(process.env.GOOGLE_SHEET_CONTACT_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            country: body.country,
            message: body.message,
            termsAccepted: body.termsAccepted,
          }),
        });
      } catch (err) {
        console.error("Google Sheets Error →", err);
      }
    }

    /** --------------------------------------------
     * 3. EMAIL TO COMPANY
     -------------------------------------------- */
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY ?? "",
      },
      body: JSON.stringify({
        sender: {
          name: "BeesZone Website",
          email: "mno-reply@brevo.com", // MUST BE VERIFIED!
        },
        to: [
          {
            email: "jibon2230@gmail.com",
            name: "BeesZone Team",
          },
        ],
        subject: `New Contact Form Submission`,
        htmlContent: AdminNotificationEmail({
          ...body,
          submissionDate,
        }),
      }),
    });

    /** --------------------------------------------
     * 4. EMAIL TO USER
     -------------------------------------------- */
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY ?? "",
      },
      body: JSON.stringify({
        sender: {
          name: "BeesZone Team",
          email: "mno-reply@brevo.com",
        },
        to: [
          {
            email: body.email,
            name: `${body.firstName} ${body.lastName}`,
          },
        ],
        subject: "Thank you for contacting BeesZone!",
        htmlContent: UserConfirmationEmail({
          ...body,
          submissionDate,
        }),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
