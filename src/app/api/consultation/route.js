// app/api/consultation/route.js
import { NextRequest, NextResponse } from "next/server";
import {
  UserConfirmationEmail,
  AdminNotificationEmail,
} from "@/components/EmailTemplates";

// Helper function to convert time between timezones
function convertTimezone(time, fromTimezone, toTimezone, date) {
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

export async function POST(request) {
  try {
    const body = await request.json();
    const submissionDate = new Date().toLocaleString();

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

    // 1. Save contact to Brevo with only actual fields
    const contactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email: userData.email,
        attributes: {
          FIRSTNAME: userData.firstName,
          LASTNAME: userData.lastName,
          COUNTRY: userData.country,
          TIMEZONE: userData.timezone,
          SPECIALIST: userData.specialist,
          DATE: userData.date,
          TIME: userData.time,
          TYPE: "Consultation Request",
          SUBMISSION_DATE: submissionDate,
        },
        updateEnabled: true,
      }),
    });

    // In your API route, update the Google Sheets section to this:

    // 2. Save to Google Sheets - CORRECTED structure
    if (process.env.GOOGLE_SHEET_CONTACT_WEBHOOK) {
      try {
        await fetch(process.env.GOOGLE_SHEET_CONTACT_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // These must match EXACTLY what your Google Script expects
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            country: userData.country,
            timezone: userData.timezone, // This was missing!
            specialist: userData.specialist, // This was missing!
            preferredDate: userData.date, // This was missing!
            preferredTime: userData.time, // This was missing!
            requestType: "Consultation",
            status: "Pending",
            message: `Consultation for ${userData.specialist} scheduled on ${userData.date} at ${userData.time} ${userData.timezone}`,
            termsAccepted: true,
          }),
        });
      } catch (googleError) {
        console.error("Google Sheets error:", googleError);
      }
    }

    // 3. Send detailed notification email to COMPANY
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "BeesZone Website",
          email: "mno-reply@brevo.com",
        },
        to: [
          {
            email: "mno-reply@brevo.com",
            name: "BeesZone Team",
          },
        ],
        subject: `New Consultation Request from ${userData.firstName} ${userData.lastName}`,
        htmlContent: AdminNotificationEmail({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          country: userData.country,
          message: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h3 style="color: #333;">Complete Consultation Request Details</h3>
              
              <h4 style="color: #555; margin-top: 20px;">Personal Information:</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; width: 30%;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.firstName} ${userData.lastName}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.email}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Country:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.country}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timezone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.timezone}</td></tr>
              </table>

              <h4 style="color: #555; margin-top: 20px;">Consultation Details:</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border: 1px solid #ddd; width: 30%;"><strong>Service Needed:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.specialist}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.date}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Preferred Time (Client):</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${userData.time} (${userData.timezone})</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Converted Time (Bangladesh):</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${bangladeshTime}</td></tr>
              </table>

              <p style="margin-top: 20px; color: #666;">
                <strong>Submitted:</strong> ${submissionDate}
              </p>
            </div>
          `,
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
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "BeesZone Team",
          email: "mno-reply@brevo.com",
        },
        to: [
          {
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
          },
        ],
        subject: "Thank you for your consultation request!",
        htmlContent: UserConfirmationEmail({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          country: userData.country,
          message: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h3 style="color: #333;">Your Consultation Request Confirmation</h3>
              
              <h4 style="color: #555; margin-top: 20px;">Your Details:</h4>
              <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
              <p><strong>Email:</strong> ${userData.email}</p>
              <p><strong>Country:</strong> ${userData.country}</p>
              <p><strong>Your Timezone:</strong> ${userData.timezone}</p>

              <h4 style="color: #555; margin-top: 20px;">Consultation Details:</h4>
              <p><strong>Service:</strong> ${userData.specialist}</p>
              <p><strong>Preferred Date:</strong> ${userData.date}</p>
              <p><strong>Preferred Time:</strong> ${userData.time} (Your Local Time)</p>
              <p><strong>Bangladesh Time:</strong> ${bangladeshTime}</p>

              <p style="margin-top: 20px; background: #f0f8ff; padding: 15px; border-radius: 5px;">
                <strong>Next Steps:</strong> We'll contact you soon to confirm the meeting time according to your timezone and discuss your requirements in detail.
              </p>

              <p style="color: #666; margin-top: 20px;">
                <strong>Request Submitted:</strong> ${submissionDate}
              </p>
            </div>
          `,
          submissionDate: submissionDate,
        }),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
