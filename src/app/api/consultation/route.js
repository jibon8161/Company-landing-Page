// src/app/api/consultation/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

    console.log("Consultation form received:", body);

    // Check if Brevo API key is available
    if (!process.env.BREVO_API_KEY) {
      console.error("❌ BREVO_API_KEY is missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    let errors = [];

    // 1. ONLY Brevo Email (start simple)
    try {
      console.log("📧 Sending email via Brevo...");

      const emailData = {
        sender: {
          name: "BeesZone Website",
          email: "motivationlife25@gmail.com", // Your verified sender
        },
        to: [
          {
            email: "jibon2230@gmail.com", // Your receiving email
            name: "BeesZone Team",
          },
        ],
        subject: `New Consultation Request from ${body.firstName} ${body.lastName}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .section { margin: 15px 0; }
              table { width: 100%; border-collapse: collapse; }
              td { padding: 8px; border: 1px solid #ddd; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎯 New Consultation Request</h2>
                <p>A new consultation request has been submitted through your website.</p>
              </div>

              <div class="section">
                <h3>👤 Client Information</h3>
                <table>
                  <tr><td style="width: 30%;"><strong>Name:</strong></td><td>${
                    body.firstName
                  } ${body.lastName}</td></tr>
                  <tr><td><strong>Email:</strong></td><td>${
                    body.email
                  }</td></tr>
                  <tr><td><strong>Country:</strong></td><td>${
                    body.country
                  }</td></tr>
                  <tr><td><strong>Timezone:</strong></td><td>${
                    body.timezone
                  }</td></tr>
                </table>
              </div>

              <div class="section">
                <h3>📅 Consultation Details</h3>
                <table>
                  <tr><td style="width: 30%;"><strong>Service Needed:</strong></td><td>${
                    body.specialist
                  }</td></tr>
                  <tr><td><strong>Preferred Date:</strong></td><td>${
                    body.date
                  }</td></tr>
                  <tr><td><strong>Preferred Time:</strong></td><td>${
                    body.time
                  }</td></tr>
                </table>
              </div>

              ${
                body.message
                  ? `
              <div class="section">
                <h3>💬 Project Details</h3>
                <p>${body.message.replace(/\n/g, "<br>")}</p>
              </div>
              `
                  : ""
              }

              <p><strong>📋 Submitted:</strong> ${submissionDate}</p>
              
              <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <strong>🚀 Action Required:</strong> Please contact the client to confirm the consultation.
              </div>
            </div>
          </body>
          </html>
        `,
      };

      const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify(emailData),
      });

      console.log("Brevo response status:", emailResponse.status);

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("❌ Brevo API error:", emailResponse.status, errorText);
        throw new Error(`Brevo API error: ${emailResponse.status}`);
      }

      console.log("✅ Email sent successfully via Brevo");
    } catch (error) {
      console.error("❌ Email error:", error);
      errors.push("Failed to send notification email");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Form submitted but email failed",
          errors: errors,
        },
        { status: 207 }
      ); // 207 = Multi-status
    }

    return NextResponse.json({
      success: true,
      message:
        "Consultation submitted successfully! We've sent you an email notification.",
    });
  } catch (error) {
    console.error("❌ Consultation API error:", error);
    return NextResponse.json(
      { error: "Failed to process consultation request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Consultation API with Brevo email is working!",
    timestamp: new Date().toISOString(),
  });
}
