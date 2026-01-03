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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You for Contacting BessZone</title>
  <style>
    /* Reset and Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', 'Inter', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      width: 100%;
      max-width: 680px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      margin: 0 auto;
      transition: all 0.3s ease;
    }
    
    /* Header Section */
    .header {
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 50%, #7CA53B 100%);
      padding: 50px 40px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
      background-size: cover;
    }
    .logo-container {
      position: relative;
      z-index: 2;
    }
    .logo {
      height: 80px;
      width: auto;
      margin: 0 auto 20px;
      display: block;
      border-radius: 16px;
      background: white;
      padding: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;
    }
    
    /* Content Section */
    .content {
      padding: 50px 40px;
      position: relative;
    }
    .welcome-text {
      color: #1f2937;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Details Card */
    .details-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 16px;
      padding: 35px;
      margin: 35px 0;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      position: relative;
    }
    .details-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
      border-radius: 4px 0 0 4px;
    }
    
    /* Detail Rows */
    .detail-row {
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid #e2e8f0;
      padding: 18px 0;
      transition: background-color 0.2s ease;
    }
    .detail-row:hover {
      background-color: rgba(255, 255, 255, 0.5);
      margin: 0 -15px;
      padding: 18px 15px;
      border-radius: 8px;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      width: 140px;
      flex-shrink: 0;
      font-size: 16px;
      color: #374151;
    }
    .detail-value {
      flex: 1;
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
    }
    
    /* CTA Button */
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
      color: white;
      text-decoration: none;
      padding: 18px 40px;
      border-radius: 12px;
      font-weight: 600;
      margin: 25px 0;
      font-size: 17px;
      transition: all 0.3s ease;
      box-shadow: 0 6px 20px rgba(89, 110, 59, 0.3);
      position: relative;
      overflow: hidden;
    }
    .cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .cta-button:hover::before {
      left: 100%;
    }
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(89, 110, 59, 0.4);
    }
    
    /* Footer */
    .footer {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      color: white;
      padding: 50px 40px 40px;
      text-align: center;
      position: relative;
    }
    .social-links {
      margin: 30px 0;
      display: flex;
      justify-content: center;
      gap: 25px;
    }
    .social-link {
      color: #cbd5e0;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 10px 20px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
    }
    .social-link:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    
    /* Contact Info */
    .contact-info {
      color: #a0aec0;
      margin-bottom: 25px;
      line-height: 1.8;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 15px 10px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .container {
        border-radius: 16px;
        max-width: 100%;
      }
      .header {
        padding: 40px 25px 30px;
      }
      .content {
        padding: 35px 25px;
      }
      .details-card {
        padding: 25px;
        margin: 25px 0;
      }
      .footer {
        padding: 40px 25px 30px;
      }
      .logo {
        height: 65px;
      }
      .welcome-text {
        font-size: 28px;
      }
      .detail-label {
        width: 120px;
        font-size: 15px;
      }
      .detail-value {
        font-size: 15px;
      }
    }
    
    @media (max-width: 640px) {
      .header {
        padding: 35px 20px 25px;
      }
      .content {
        padding: 30px 20px;
      }
      .details-card {
        padding: 20px;
        margin: 20px 0;
      }
      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 15px 0;
      }
      .detail-row:hover {
        margin: 0 -10px;
        padding: 15px 10px;
      }
      .detail-label {
        width: 100%;
        margin-bottom: 4px;
      }
      .social-links {
        flex-direction: column;
        gap: 12px;
        align-items: center;
      }
      .social-link {
        width: 200px;
        text-align: center;
      }
      .cta-button {
        padding: 16px 32px;
        font-size: 16px;
        width: 100%;
        text-align: center;
      }
    }
    
    @media (max-width: 480px) {
      body {
        padding: 10px 5px;
      }
      .container {
        border-radius: 12px;
      }
      .header {
        padding: 30px 15px 20px;
      }
      .content {
        padding: 25px 15px;
      }
      .welcome-text {
        font-size: 24px;
      }
      .logo {
        height: 55px;
      }
      .details-card {
        padding: 18px;
      }
      .footer {
        padding: 30px 15px 25px;
      }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .container {
        background: #1a202c;
        color: #e2e8f0;
      }
      .details-card {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-color: #4a5568;
      }
      .welcome-text {
        background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo-container">
        <img src="${LOGO_URL}" alt="BessZone Logo" class="logo">
        <h1 style="color: white; font-size: 42px; font-weight: 800; margin: 0 0 12px; position: relative; z-index: 2;">BessZone</h1>
        <p style="color: rgba(255, 255, 255, 0.95); margin: 0; font-size: 18px; font-weight: 400; position: relative; z-index: 2;">The Silent Partner in Your Success</p>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="welcome-text">Hello, ${firstName}!</h2>
      
      <div style="color: #6b7280; line-height: 1.7; margin-bottom: 30px; font-size: 16px;">
        <p style="margin-bottom: 18px; color: #4b5563;">Thank you for reaching out to BessZone. We have received your message and our team will get back to you within 24 hours.</p>
        <p style="margin-bottom: 18px; color: #4b5563;">We appreciate your interest in our services and look forward to connecting with you.</p>
      </div>

      <!-- Details Card -->
      <div class="details-card">
        <h3 style="color: #1f2937; font-size: 24px; font-weight: 700; margin-bottom: 28px; display: flex; align-items: center; gap: 12px;">
          <span style="background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 18px;">📋</span>
          Your Submission Details
        </h3>
        <div style="color: #374151;">
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">${firstName} ${lastName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${email}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Country:</span>
            <span class="detail-value">${country}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Submitted:</span>
            <span class="detail-value">${submissionDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Message:</span>
            <span class="detail-value">${message}</span>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center;">
        <a href="https://Besszone.netlify.app/" class="cta-button">
          Visit Our Website →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="social-links">
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">LinkedIn</a>
        <a href="#" class="social-link">Instagram</a>
      </div>
      
      <div class="contact-info">
        <p style="margin-bottom: 10px; font-size: 16px;">📧 jibon2230@gmail.com | 📞 +8801717438161</p>
        <p style="font-size: 16px;">📍 Dhaka, Bangladesh</p>
      </div>
      
      <div style="color: #9ca3af; font-size: 14px; margin-top: 25px;">
        &copy; 2024 BessZone. All rights reserved. | The Silent Partner in Your Success
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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Form Submission - BessZone</title>
  <style>
    /* Reset and Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', 'Inter', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      width: 100%;
      max-width: 750px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      margin: 0 auto;
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 50%, #7CA53B 100%);
      padding: 35px 40px;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
      background-size: cover;
    }
    
    /* Alert Section */
    .alert {
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      border-left: 5px solid #d97706;
      padding: 25px;
      margin: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.1);
    }
    
    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .info-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 12px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .info-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
    }
    .info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Action Buttons */
    .action-buttons {
      display: flex;
      gap: 16px;
      margin-top: 10px;
    }
    .action-button {
      flex: 1;
      text-align: center;
      padding: 18px 24px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .action-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .action-button:hover::before {
      left: 100%;
    }
    .action-button.primary {
      background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%);
      color: white;
      box-shadow: 0 6px 20px rgba(89, 110, 59, 0.3);
    }
    .action-button.secondary {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: white;
      box-shadow: 0 6px 20px rgba(107, 114, 128, 0.3);
    }
    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    /* Message Box */
    .message-box {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 12px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      margin-bottom: 30px;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 15px 10px;
      }
      .container {
        border-radius: 16px;
        max-width: 100%;
      }
      .header {
        padding: 30px 25px;
      }
      .content {
        padding: 0 25px 30px;
      }
      .alert {
        margin: 25px;
        padding: 20px;
      }
      .info-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      .info-card {
        padding: 20px;
      }
    }
    
    @media (max-width: 640px) {
      .header > div {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
      .action-buttons {
        flex-direction: column;
      }
      .header {
        padding: 25px 20px;
      }
      .content {
        padding: 0 20px 25px;
      }
      .alert {
        margin: 20px;
        padding: 18px;
      }
    }
    
    @media (max-width: 480px) {
      body {
        padding: 10px 5px;
      }
      .container {
        border-radius: 12px;
      }
      .header {
        padding: 20px 15px;
      }
      .content {
        padding: 0 15px 20px;
      }
      .alert {
        margin: 15px;
        padding: 15px;
      }
      .info-card {
        padding: 18px;
      }
      .action-button {
        padding: 16px 20px;
        font-size: 15px;
      }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .container {
        background: #1a202c;
        color: #e2e8f0;
      }
      .info-card, .message-box {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-color: #4a5568;
      }
      .alert {
        background: linear-gradient(135deg, #451a03 0%, #78350f 100%);
        border-left-color: #ea580c;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 2;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <img src="${LOGO_URL}" alt="BessZone Logo" style="height: 50px; background: white; padding: 8px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
          <div>
            <h1 style="color: white; font-size: 28px; font-weight: 800; margin: 0;">New Contact Submission</h1>
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 4px 0 0; font-weight: 500;">BessZone Website</p>
          </div>
        </div>
        <div style="color: white; font-size: 14px; background: rgba(255,255,255,0.2); padding: 8px 20px; border-radius: 25px; font-weight: 600; backdrop-filter: blur(10px);">
          ${submissionDate}
        </div>
      </div>
    </div>

    <!-- Alert -->
    <div class="alert">
      <div style="display: flex; align-items: flex-start; gap: 18px;">
        <div style="color: #d97706; flex-shrink: 0; font-size: 22px; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 4px 8px rgba(217, 119, 6, 0.2);">⚠️</div>
        <div>
          <p style="color: #92400e; margin: 0; font-size: 17px; line-height: 1.5; font-weight: 600;">
            New contact form submission received
          </p>
          <p style="color: #b45309; margin: 8px 0 0; font-size: 15px; line-height: 1.5;">
            Please respond within 24 hours to maintain excellent customer service.
          </p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 40px 40px;" class="content">
      <h2 style="color: #1f2937; font-size: 26px; font-weight: 700; margin-bottom: 30px; display: flex; align-items: center; gap: 12px;">
        <span style="background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 16px;">👤</span>
        Contact Details
      </h2>

      <!-- User Info Grid -->
      <div class="info-grid">
        <div class="info-card">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</div>
          <div style="font-size: 18px; font-weight: 700; color: #1f2937;">${firstName} ${lastName}</div>
        </div>
        <div class="info-card">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</div>
          <div style="font-size: 18px; font-weight: 700; color: #596E3B;">${email}</div>
        </div>
        <div class="info-card">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Country</div>
          <div style="font-size: 18px; font-weight: 700; color: #1f2937;">${country}</div>
        </div>
        <div class="info-card">
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Submitted</div>
          <div style="font-size: 18px; font-weight: 700; color: #1f2937;">${submissionDate}</div>
        </div>
      </div>

      <!-- Message -->
      <div style="margin-bottom: 35px;">
        <h3 style="font-size: 22px; font-weight: 700; color: #1f2937; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
          <span style="background: linear-gradient(135deg, #596E3B 0%, #6B8E23 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 16px;">💬</span>
          Message
        </h3>
        <div class="message-box">
          <p style="color: #374151; margin: 0; white-space: pre-wrap; line-height: 1.7; font-size: 16px; font-weight: 500;">${message}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <a href="mailto:${email}" class="action-button primary">
          📧 Reply via Email
        </a>
        <a href="https://Besszone.netlify.app/" class="action-button secondary">
          🌐 View Website
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
