// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

    console.log("Contact form submission received:", body);

    // Validate required fields
    if (!body.email || !body.firstName) {
      return NextResponse.json(
        { error: "Email and first name are required" },
        { status: 400 }
      );
    }

    // Check if Brevo API key is available
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY is missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    let errors = [];

    // 1. Save to Google Sheets
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
              lastName: body.lastName || "",
              email: body.email,
              country: body.country || "",
              message: body.message || "",
              termsAccepted: body.termsAccepted || false,
              timestamp: submissionDate,
            }),
          }
        );

        if (!googleSheetResponse.ok) {
          console.error("Google Sheets error:", googleSheetResponse.status);
          errors.push("Google Sheets failed");
        } else {
          console.log("Google Sheets saved successfully");
        }
      } catch (googleError) {
        console.error("Google Sheets error:", googleError);
        errors.push("Google Sheets failed");
      }
    }

    // 2. Send notification email to COMPANY
    try {
      const companyEmailResponse = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: {
              name: "BeesZone Website",
              email: "motivationlife25@gmail.com",
            },
            to: [
              {
                email: "jibon2230@gmail.com",
                name: "BeesZone Team",
              },
            ],
            subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
            htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
                .detail { margin: 10px 0; }
                .label { font-weight: bold; color: #333; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Contact Form Submission</h2>
                  <p>You have received a new contact form submission from your website.</p>
                </div>
                <div class="details">
                  <div class="detail"><span class="label">Name:</span> ${
                    body.firstName
                  } ${body.lastName}</div>
                  <div class="detail"><span class="label">Email:</span> ${
                    body.email
                  }</div>
                  <div class="detail"><span class="label">Country:</span> ${
                    body.country || "Not provided"
                  }</div>
                  <div class="detail"><span class="label">Message:</span></div>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    ${(body.message || "No message provided").replace(
                      /\n/g,
                      "<br>"
                    )}
                  </div>
                  <div class="detail"><span class="label">Submitted:</span> ${submissionDate}</div>
                </div>
              </div>
            </body>
            </html>
          `,
          }),
        }
      );

      if (!companyEmailResponse.ok) {
        const errorText = await companyEmailResponse.text();
        console.error(
          "Company email failed:",
          companyEmailResponse.status,
          errorText
        );
        errors.push("Company email failed");
      } else {
        console.log("Company email sent successfully");
      }
    } catch (emailError) {
      console.error("Company email error:", emailError);
      errors.push("Company email failed");
    }

    // 3. Send confirmation email to USER
    try {
      const userEmailResponse = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: {
              name: "BeesZone Team",
              email: "motivationlife25@gmail.com",
            },
            to: [
              {
                email: body.email,
                name: `${body.firstName} ${body.lastName}`,
              },
            ],
            subject: "Thank you for contacting BeesZone!",
            htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
                .detail { margin: 10px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Thank You for Contacting BeesZone!</h2>
                  <p>We have received your message and will get back to you soon.</p>
                </div>
                <div class="details">
                  <p><strong>Hello ${body.firstName},</strong></p>
                  <p>Thank you for reaching out to BeesZone. We have received your consultation request and our team will review it shortly.</p>
                  <p>We typically respond within 24 hours during business days.</p>
                  <p><strong>Your submission details:</strong></p>
                  <ul>
                    <li><strong>Name:</strong> ${body.firstName} ${
              body.lastName
            }</li>
                    <li><strong>Email:</strong> ${body.email}</li>
                    <li><strong>Country:</strong> ${
                      body.country || "Not provided"
                    }</li>
                    <li><strong>Submitted:</strong> ${submissionDate}</li>
                  </ul>
                  <p>If you have any urgent inquiries, please feel free to contact us directly at <strong>+8801717438161</strong>.</p>
                  <p>Best regards,<br>The BeesZone Team</p>
                </div>
              </div>
            </body>
            </html>
          `,
          }),
        }
      );

      if (!userEmailResponse.ok) {
        console.error("User email failed:", userEmailResponse.status);
        errors.push("User email failed");
      } else {
        console.log("User email sent successfully");
      }
    } catch (emailError) {
      console.error("User email error:", emailError);
      errors.push("User email failed");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Form submitted with some errors",
          errors: errors,
        },
        { status: 207 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// Add GET method for testing
export async function GET() {
  return NextResponse.json({
    message: "Contact API is working",
    timestamp: new Date().toISOString(),
  });
}
