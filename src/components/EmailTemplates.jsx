// components/EmailTemplates.jsx
const LOGO_URL =
  "https://i.ibb.co.com/tMGmp19b/Whats-App-Image-2025-11-30-at-00-39-51-9f49303d.jpg";

export const UserConfirmationEmail = ({
  firstName,
  lastName,
  email,
  country,
  message,
  submissionDate,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting BeesZone</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body { 
      font-family: 'Inter', Arial, sans-serif; 
      background-color: #f9fafb; 
      padding: 40px 20px;
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      width: 100%;
      max-width: 800px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin: 0 auto;
    }
    .header {
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
      padding: 50px 40px;
      text-align: center;
    }
    .logo {
      height: 80px;
      margin: 0 auto 20px;
      display: block;
      border-radius: 12px;
      background: white;
      padding: 12px;
    }
    .content {
      padding: 50px 40px;
    }
    .details-card {
      background-color: #f8f9fa;
      border-radius: 12px;
      padding: 32px;
      margin: 32px 0;
      border: 1px solid #e9ecef;
    }
    .footer {
      background-color: #1f2937;
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
      font-size: 16px;
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(89, 110, 59, 0.3);
    }
    .social-links {
      margin: 25px 0;
    }
    .social-links a {
      color: #d1fae5;
      margin: 0 16px;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    .social-links a:hover {
      color: #ffffff;
    }
    @media (max-width: 768px) {
      body {
        padding: 20px 10px;
      }
      .container {
        border-radius: 12px;
      }
      .header {
        padding: 40px 20px;
      }
      .content {
        padding: 30px 20px;
      }
      .details-card {
        padding: 24px;
        margin: 24px 0;
      }
      .footer {
        padding: 30px 20px;
      }
      .logo {
        height: 60px;
      }
    }
    @media (max-width: 480px) {
      .detail-row {
        flex-direction: column;
      }
      .detail-label {
        width: 100%;
        margin-bottom: 8px;
      }
      .social-links a {
        display: block;
        margin: 8px 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img src="${LOGO_URL}" alt="BeesZone Logo" class="logo">
      <h1 style="color: white; font-size: 36px; font-weight: bold; margin: 0 0 12px;">BeesZone</h1>
      <p style="color: white; opacity: 0.9; margin: 0; font-size: 18px;">The Silent Partner in Your Success</p>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 style="color: #1f2937; font-size: 28px; font-weight: 600; margin-bottom: 20px;">Hello, ${firstName}!</h2>
      
      <div style="color: #6b7280; line-height: 1.7; margin-bottom: 30px; font-size: 16px;">
        <p style="margin-bottom: 16px;">Thank you for reaching out to BeesZone. We have received your message and our team will get back to you within 24 hours.</p>
        <p style="margin-bottom: 16px;">We appreciate your interest in our services and look forward to connecting with you.</p>
      </div>

      <!-- Details Card -->
      <div class="details-card">
        <h3 style="color: #1f2937; font-size: 22px; font-weight: 600; margin-bottom: 24px;">Your Submission Details</h3>
        <div style="color: #374151;">
          <div style="display: flex; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 16px;">
            <span style="font-weight: 600; width: 120px; font-size: 16px;">Name:</span>
            <span style="font-size: 16px;">${firstName} ${lastName}</span>
          </div>
          <div style="display: flex; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 16px;">
            <span style="font-weight: 600; width: 120px; font-size: 16px;">Email:</span>
            <span style="font-size: 16px;">${email}</span>
          </div>
          <div style="display: flex; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 16px;">
            <span style="font-weight: 600; width: 120px; font-size: 16px;">Country:</span>
            <span style="font-size: 16px;">${country}</span>
          </div>
          <div style="display: flex; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 16px;">
            <span style="font-weight: 600; width: 120px; font-size: 16px;">Submitted:</span>
            <span style="font-size: 16px;">${submissionDate}</span>
          </div>
          <div style="display: flex;">
            <span style="font-weight: 600; width: 120px; font-size: 16px;">Message:</span>
            <span style="flex: 1; font-size: 16px; line-height: 1.6;">${message}</span>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center;">
        <a href="https://beeszone.netlify.app/" class="cta-button" style="color: white; text-decoration: none;">
          Visit Our Website
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="social-links">
        <a href="#" style="color: #d1fae5; margin: 0 16px; text-decoration: none;">Facebook</a>
        <a href="#" style="color: #d1fae5; margin: 0 16px; text-decoration: none;">Twitter</a>
        <a href="#" style="color: #d1fae5; margin: 0 16px; text-decoration: none;">LinkedIn</a>
        <a href="#" style="color: #d1fae5; margin: 0 16px; text-decoration: none;">Instagram</a>
      </div>
      
      <div style="color: #9ca3af; margin-bottom: 20px; line-height: 1.6;">
        <p style="margin-bottom: 8px; font-size: 15px;">Email: jibon2230@gmail.com | Phone: +8801717438161</p>
        <p style="font-size: 15px;">Dhaka, Bangladesh</p>
      </div>
      
      <div style="color: #6b7280; font-size: 14px;">
        &copy; 2024 BeesZone. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

export const AdminNotificationEmail = ({
  firstName,
  lastName,
  email,
  country,
  message,
  submissionDate,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - BeesZone</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body { 
      font-family: 'Inter', Arial, sans-serif; 
      background-color: #f9fafb; 
      padding: 40px 20px;
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      width: 100%;
      max-width: 800px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin: 0 auto;
    }
    .header {
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
      padding: 30px;
    }
    .alert {
      background: #fef3c7;
      border-left: 4px solid #d97706;
      padding: 20px;
      margin: 25px;
      border-radius: 8px;
    }
    .action-buttons {
      display: flex;
      gap: 16px;
      margin-top: 10px;
    }
    @media (max-width: 768px) {
      body {
        padding: 20px 10px;
      }
      .container {
        border-radius: 12px;
      }
      .header {
        padding: 25px 20px;
      }
      .alert {
        margin: 20px;
        padding: 16px;
      }
    }
    @media (max-width: 480px) {
      .header > div {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
      .action-buttons {
        flex-direction: column;
      }
      .info-grid {
        grid-template-columns: 1fr !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <img src="${LOGO_URL}" alt="BeesZone Logo" style="height: 40px; background: white; padding: 6px; border-radius: 6px;">
          <div>
            <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0;">New Contact Submission</h1>
            <p style="color: #e5e7eb; font-size: 16px; margin: 0;">BeesZone Website</p>
          </div>
        </div>
        <div style="color: white; font-size: 15px; background: rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 20px;">
          ${submissionDate}
        </div>
      </div>
    </div>

    <!-- Alert -->
    <div class="alert">
      <div style="display: flex; align-items: flex-start; gap: 16px;">
        <div style="color: #d97706; flex-shrink: 0; font-size: 18px;">⚠️</div>
        <p style="color: #92400e; margin: 0; font-size: 16px; line-height: 1.5;">
          New contact form submission received. Please respond within 24 hours.
        </p>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 30px 30px;">
      <h2 style="color: #1f2937; font-size: 24px; font-weight: 600; margin-bottom: 25px;">Contact Details</h2>

      <!-- User Info Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;" class="info-grid">
        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
          <div style="font-size: 15px; color: #6b7280; margin-bottom: 8px;">Full Name</div>
          <div style="font-size: 18px; font-weight: 600; color: #1f2937;">${firstName} ${lastName}</div>
        </div>
        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
          <div style="font-size: 15px; color: #6b7280; margin-bottom: 8px;">Email Address</div>
          <div style="font-size: 18px; font-weight: 600; color: #596E3B;">${email}</div>
        </div>
        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
          <div style="font-size: 15px; color: #6b7280; margin-bottom: 8px;">Country</div>
          <div style="font-size: 18px; font-weight: 600; color: #1f2937;">${country}</div>
        </div>
        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
          <div style="font-size: 15px; color: #6b7280; margin-bottom: 8px;">Submitted</div>
          <div style="font-size: 18px; font-weight: 600; color: #1f2937;">${submissionDate}</div>
        </div>
      </div>

      <!-- Message -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">Message</h3>
        <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 16px;">${message}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <a href="mailto:${email}" 
           style="flex: 1; background: #596E3B; color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px; transition: all 0.3s ease;">
          Reply via Email
        </a>
        <a href="https://beeszone.netlify.app/" 
           style="flex: 1; background: #6b7280; color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px; transition: all 0.3s ease;">
          View Website
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
