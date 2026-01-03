// src/app/api/contact/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

    console.log("Form data received:", body);

    // 1. Save contact to Brevo
    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
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

    if (!contactResponse.ok) {
      console.error("Brevo contact error:", await contactResponse.text());
    } else {
      console.log("✅ Contact saved to Brevo");
    }

    // 2. Save to Google Sheets
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

        if (googleSheetResponse.ok) {
          console.log("✅ Data saved to Google Sheets");
        }
      } catch (googleError) {
        console.error("Google Sheets error:", googleError);
      }
    }

    // 3. Send notification email to COMPANY
    try {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "BessZone Website",
            email: "motivationlife25@gmail.com",
          },
          to: [
            {
              email: "jibon2230@gmail.com",
              name: "BessZone Team",
            },
          ],
          subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Country:</strong> ${body.country}</p>
            <p><strong>Message:</strong> ${body.message}</p>
            <p><strong>Submitted:</strong> ${submissionDate}</p>
          `,
        }),
      });
      console.log("✅ Notification email sent to company");
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // 4. Send confirmation email to USER
    try {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "BessZone Team",
            email: "motivationlife25@gmail.com",
          },
          to: [
            {
              email: body.email,
              name: `${body.firstName} ${body.lastName}`,
            },
          ],
          subject: "Thank you for contacting BessZone!",
          htmlContent: `
            <h2>Thank You for Contacting BessZone!</h2>
            <p>Dear ${body.firstName},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your Message:</strong> ${body.message}</p>
            <p>Best regards,<br/>BessZone Team</p>
          `,
        }),
      });
      console.log("✅ Confirmation email sent to user");
    } catch (emailError) {
      console.error("Confirmation email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - for testing
export async function GET() {
  return NextResponse.json({
    message: "Contact API is working!",
    status: "OK",
  });
}

// OPTIONS - for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
