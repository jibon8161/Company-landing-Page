// app/api/contact/route.js
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import {
  UserConfirmationEmail,
  AdminNotificationEmail,
} from "@/components/EmailTemplates";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

    // 1. Save contact to Brevo
    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
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

    // 2. Save to Google Sheets (ADD THIS PART)
    if (process.env.GOOGLE_SHEET_CONTACT_WEBHOOK) {
      try {
        const googleSheetResponse = await fetch(
          process.env.GOOGLE_SHEET_CONTACT_WEBHOOK,
          {
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
          }
        );

        const googleSheetResult = await googleSheetResponse.json();
        console.log("Google Sheets result:", googleSheetResult);
      } catch (googleError) {
        console.error("Google Sheets error:", googleError);
        // Don't fail the entire request if Google Sheets fails
      }
    }

    // 3. Send notification email to COMPANY
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "BeesZone Website",
          email: "mno-reply@brevo.com
",
        },
        to: [
          {
            email: "jibon2230@gmail.com", // COMPANY EMAIL
            name: "BeesZone Team",
          },
        ],
        subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
        htmlContent: AdminNotificationEmail({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          country: body.country,
          message: body.message,
          submissionDate: submissionDate,
        }),
      }),
    });

    // 4. Send confirmation email to USER
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "BeesZone Team",
          email: "mno-reply@brevo.com
",
        },
        to: [
          {
            email: body.email,
            name: `${body.firstName} ${body.lastName}`,
          },
        ],
        subject: "Thank you for contacting BeesZone!",
        htmlContent: UserConfirmationEmail({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          country: body.country,
          message: body.message,
          submissionDate: submissionDate,
        }),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
