import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Store conversation context (in-memory, for production use Redis or database)
const conversationContext = new Map();

export async function POST(request: NextRequest) {
  console.log("[API] Chat endpoint called");

  let userMessage = "";

  try {
    // 1. Get API key
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("[API] GEMINI_API_KEY is missing");
      return NextResponse.json(
        {
          success: false,
          message:
            "AI service is temporarily unavailable. Please contact us directly.",
        },
        { status: 500 },
      );
    }

    // 2. Parse request
    const body = await request.json();
    userMessage = body.message || "";
    const sessionId = body.sessionId || "default";

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a message",
        },
        { status: 400 },
      );
    }

    console.log("[API] User message:", userMessage);

    // 3. Get conversation history
    const history = conversationContext.get(sessionId) || [];
    history.push({ role: "user", content: userMessage });

    // 4. Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // COMPREHENSIVE WEBSITE INFORMATION
    const prompt = `You are a helpful AI assistant for "Bess Zone" website owned by Jibon (Full Stack Developer).

CRITICAL INFORMATION - USE THESE DETAILS TO ANSWER:

=== WEBSITE OWNER & STATISTICS ===
• Creator: Jibon (Full Stack Developer)
• Google Rating: 4.86/5 stars (from 3896 reviews)
• Client Testimonials: 364 testimonials in 2024-2025
• Revenue Generated: 50K+ from projects & marketing
• Contact Email: jibon2230@gmail.com
• Contact Phone: +8801717438161
• Location: Dhaka, Bangladesh

=== SKILLS & EXPERTISE ===
• Web Development (React & Node.js): 95%
• Data Scraping & Automation: 90%
• E-commerce Product Management: 88%
• Virtual Assistant Services: 92%
• Data Entry & Processing: 85%

=== COMPREHENSIVE SERVICES ===

1. WEB & SOFTWARE DEVELOPMENT:
   • Custom Website Development
   • Bug Fixing (Node.js & JavaScript)
   • Landing Page Development (React & Tailwind CSS)
   • MongoDB Code Fix & Optimization
   • Chatbot Development

2. VIRTUAL ASSISTANCE & BUSINESS SUPPORT:
   • Virtual Assistant Services
   • Data Entry
   • Data Collection
   • PDF to Excel Conversion
   • Word to Excel Conversion

3. DATA & RESEARCH SERVICES:
   • Web Research
   • Data Scraping
   • Lead Generation
   • LinkedIn Profile Creation & Optimization

4. DESIGN & BRANDING:
   • Graphic Design
   • Branding & Identity Design
   • Book Cover & Interior Design
   • Photo Editing
   • Wedding Banner Design

5. SOCIAL MEDIA & MARKETING:
   • Social Media Management
   • Facebook Ads Management

=== PORTFOLIO PROJECTS ===
• Cozycasa - Real Estate Website
• Mars - Tech Platform
• Everyday Humans - Lifestyle Brand
• Rocket Squared - Business Solutions
• Panda Logo - Brand Design
• Fusion Dynamics - Corporate Website
• InnovateX Ventures - Startup Platform
• Nebula Holdings - Financial Services
• Summit Partners - Consulting Firm
• Apex Strategies - Marketing Agency

=== PROJECT TIMELINES ===
• Small projects: 1-2 weeks
• Medium projects: 2-4 weeks
• Large projects: 1-3 months

=== PRICING INFORMATION ===
• Starts from $500 for basic websites
• Custom quotes for complex projects
• Maintenance packages available

=== HOW TO ANSWER SPECIFIC QUESTIONS ===

FOR "What services do you offer?":
Response MUST include:
1. List all 5 service categories
2. Ask if they want details on any specific service
3. Keep it friendly and engaging

Example response: "We offer 5 main service categories: Web Development, Virtual Assistance, Data Services, Design & Branding, and Social Media Marketing. Would you like details on any specific service?"

FOR "yes", "details", "tell me more":
Provide detailed breakdown of ALL services with bullet points and emojis.

FOR specific service questions:
Provide detailed information about that service only.

=== CURRENT CONVERSATION ===
Previous messages: ${history
      .slice(-3)
      .map(
        (msg: { role: string; content: string }) =>
          `${msg.role}: ${msg.content}`,
      )
      .join("\n")}

=== USER'S QUESTION ===
"${userMessage}"

=== YOUR RESPONSE ===
Remember: Be helpful, professional, and use the information above.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("[API] Success! Response generated");

    // Save assistant response to history
    history.push({ role: "assistant", content: text });
    conversationContext.set(sessionId, history.slice(-10)); // Keep last 10 messages

    return NextResponse.json({
      success: true,
      message: text,
      model: "gemini-2.0-flash",
      sessionId: sessionId,
    });
  } catch (error: any) {
    console.error("[API] Error:", error.message);

    // Enhanced fallback responses
    const lowerMessage = userMessage?.toLowerCase() || "";
    let fallbackResponse = "";

    // Handle specific questions
    if (
      lowerMessage.includes("what services") ||
      lowerMessage.includes("services do you")
    ) {
      fallbackResponse = `We offer comprehensive services in 5 main categories:

🌐 **Web & Software Development** (95% expertise)
• Custom websites, bug fixing, landing pages, MongoDB optimization, chatbots

👨‍💼 **Virtual Assistance & Business Support** (92% expertise)
• VA services, data entry, data collection, document conversion

📊 **Data & Research Services** (90% expertise)
• Web research, data scraping, lead generation, LinkedIn optimization

🎨 **Design & Branding**
• Graphic design, branding, book design, photo editing, wedding banners

📱 **Social Media & Marketing**
• Social media management, Facebook ads

Would you like details on any specific service?`;
    } else if (
      lowerMessage.includes("yes") ||
      lowerMessage.includes("details") ||
      lowerMessage.includes("tell me more")
    ) {
      fallbackResponse = `Sure! Here are detailed service breakdowns:

📱 **WEB & SOFTWARE DEVELOPMENT** (95% expertise)
• Custom Website Development - Full-stack solutions
• Bug Fixing - Node.js & JavaScript issues
• Landing Pages - React & Tailwind CSS
• MongoDB Optimization - Database performance
• Chatbot Development - AI customer support

👨‍💼 **VIRTUAL ASSISTANCE** (92% expertise)
• Virtual Assistant - Daily business tasks
• Data Entry & Processing - Accurate data handling
• PDF/Word to Excel - Document conversion
• Data Collection - Research & information

📊 **DATA & RESEARCH** (90% expertise)
• Data Scraping - Website data extraction
• Web Research - Market analysis
• Lead Generation - Business leads
• LinkedIn Optimization - Profile enhancement

🎨 **DESIGN & BRANDING**
• Graphic Design - Logos, banners
• Brand Identity - Complete branding
• Book Design - Cover & layout
• Photo Editing - Professional images
• Wedding Designs - Special occasions

📱 **SOCIAL MEDIA & MARKETING**
• Social Media Management - Content planning
• Facebook Ads - Targeted campaigns

💰 Pricing from $500 | 📞 Contact: jibon2230@gmail.com | +8801717438161`;
    } else if (
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey")
    ) {
      fallbackResponse =
        "Hello! 👋 I'm your AI assistant for Bess Zone. I can help you with information about our web development, virtual assistance, data services, design work, and more! How can I assist you today?";
    } else if (
      lowerMessage.includes("who built") ||
      lowerMessage.includes("who created")
    ) {
      fallbackResponse =
        "This website was created by Jibon, a full-stack developer based in Dhaka, Bangladesh. He has a 4.86/5 rating from 3896 Google reviews and has received 364 client testimonials.";
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("phone")
    ) {
      fallbackResponse =
        "Contact Information:\n📧 Email: jibon2230@gmail.com\n📞 Phone: +8801717438161\n📍 Location: Dhaka, Bangladesh";
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("how much")
    ) {
      fallbackResponse =
        "Pricing Information:\n💰 Basic websites: Starting from $500\n💼 Custom projects: Personalized quotes\n📊 Maintenance: Monthly packages available\n*Contact for exact pricing based on your needs*";
    } else {
      fallbackResponse =
        "I'm here to help! I can tell you about our services, portfolio, contact details, project timelines, and pricing. What would you like to know?";
    }

    return NextResponse.json({
      success: true,
      message: fallbackResponse,
      source: "fallback",
      error: error.message,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Chat API is running",
    model: "gemini-2.0-flash",
    timestamp: new Date().toISOString(),
    services: "Web Dev, Virtual Assistance, Data Services, Design, Marketing",
  });
}
