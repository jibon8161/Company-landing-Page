// src/app/api/consultation/route.ts
import { NextResponse } from "next/server";

// Helper function to convert time between timezones
function convertTimezone(
  time: string,
  fromTimezone: string,
  toTimezone: string,
  date: string
): string {
  try {
    const [hours, minutes] = time.split(":");
    const localDate = new Date(date);
    localDate.setHours(parseInt(hours), parseInt(minutes));

    const convertedTimeString = localDate.toLocaleString("en-US", {
      timeZone: toTimezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return convertedTimeString;
  } catch (error) {
    console.error("Timezone conversion error:", error);
    return `${time} (Conversion failed)`;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

    console.log("Consultation form received:", body);

    // Validate required fields
    if (!body.email || !body.firstName) {
      return NextResponse.json(
        { error: "Email and first name are required" },
        { status: 400 }
      );
    }

    // Only use the fields that actually come from the form
    const userData = {
      firstName: body.firstName || "Not provided",
      lastName: body.lastName || "Not provided",
      email: body.email || "Not provided",
      country: body.country || "Not provided",
      timezone: body.timezone || "Not provided",
      specialist: body.specialist || "Not provided",
      date: body.date || "Not provided",
      time: body.time || "Not provided",
    };

    // Convert time to Bangladesh time
    const bangladeshTime = convertTimezone(
      userData.time,
      userData.timezone,
      "Asia/Dhaka",
      userData.date
    );

    // Get API key safely
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error("Brevo API key is missing");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    let errors = [];

    // 1. Save to Google Sheets
    if (process.env.GOOGLE_SHEET_CONTACT_WEBHOOK) {
      try {
        await fetch(process.env.GOOGLE_SHEET_CONTACT_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            country: userData.country,
            timezone: userData.timezone,
            specialist: userData.specialist,
            preferredDate: userData.date,
            preferredTime: userData.time,
            requestType: "Consultation",
            status: "Pending",
            message: `Consultation for ${userData.specialist} scheduled on ${userData.date} at ${userData.time} ${userData.timezone}`,
            termsAccepted: true,
            timestamp: submissionDate,
          }),
        });
        console.log("Google Sheets saved successfully");
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
            "api-key": brevoApiKey,
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
            subject: `New Consultation Request from ${userData.firstName} ${userData.lastName}`,
            htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
                .section { margin: 20px 0; }
                .section-title { color: #555; margin-bottom: 10px; font-size: 18px; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                td { padding: 10px; border: 1px solid #ddd; }
                .highlight { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Consultation Request</h2>
                  <p>A new consultation request has been submitted through the website.</p>
                </div>

                <div class="section">
                  <div class="section-title">Personal Information</div>
                  <table>
                    <tr><td style="width: 30%;"><strong>Name:</strong></td><td>${userData.firstName} ${userData.lastName}</td></tr>
                    <tr><td><strong>Email:</strong></td><td>${userData.email}</td></tr>
                    <tr><td><strong>Country:</strong></td><td>${userData.country}</td></tr>
                    <tr><td><strong>Timezone:</strong></td><td>${userData.timezone}</td></tr>
                  </table>
                </div>

                <div class="section">
                  <div class="section-title">Consultation Details</div>
                  <table>
                    <tr><td style="width: 30%;"><strong>Service Needed:</strong></td><td>${userData.specialist}</td></tr>
                    <tr><td><strong>Preferred Date:</strong></td><td>${userData.date}</td></tr>
                    <tr><td><strong>Preferred Time (Client):</strong></td><td>${userData.time} (${userData.timezone})</td></tr>
                    <tr><td><strong>Converted Time (Bangladesh):</strong></td><td>${bangladeshTime}</td></tr>
                  </table>
                </div>

                <div class="highlight">
                  <strong>Action Required:</strong> Please contact the client to confirm the consultation time.
                </div>

                <p><strong>Submitted:</strong> ${submissionDate}</p>
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
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            sender: {
              name: "BeesZone Team",
              email: "motivationlife25@gmail.com",
            },
            to: [
              {
                email: userData.email,
                name: `${userData.firstName} ${userData.lastName}`,
              },
            ],
            subject: "Thank you for your consultation request!",
            htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
                .details { margin: 20px 0; }
                .highlight { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Thank You for Your Consultation Request!</h2>
                  <p>We have received your request and will contact you soon to confirm the details.</p>
                </div>

                <div class="details">
                  <p><strong>Hello ${userData.firstName},</strong></p>
                  
                  <p><strong>Your Consultation Details:</strong></p>
                  <ul>
                    <li><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</li>
                    <li><strong>Email:</strong> ${userData.email}</li>
                    <li><strong>Country:</strong> ${userData.country}</li>
                    <li><strong>Your Timezone:</strong> ${userData.timezone}</li>
                    <li><strong>Service:</strong> ${userData.specialist}</li>
                    <li><strong>Preferred Date:</strong> ${userData.date}</li>
                    <li><strong>Preferred Time:</strong> ${userData.time} (Your Local Time)</li>
                    <li><strong>Bangladesh Time:</strong> ${bangladeshTime}</li>
                  </ul>

                  <div class="highlight">
                    <strong>Next Steps:</strong> Our team will contact you within 24 hours to confirm the meeting time according to your timezone and discuss your requirements in detail.
                  </div>

                  <p>If you have any urgent inquiries, please contact us at <strong>+8801717438161</strong>.</p>
                  
                  <p>Best regards,<br><strong>The BeesZone Team</strong></p>
                </div>

                <p style="color: #666; margin-top: 20px;">
                  <strong>Request Submitted:</strong> ${submissionDate}
                </p>
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
          message: "Consultation submitted with some errors",
          errors: errors,
        },
        { status: 207 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully",
    });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// Add GET method for testing
export async function GET() {
  return NextResponse.json({
    message: "Consultation API is working",
    timestamp: new Date().toISOString(),
  });
}
