import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Configure the Google AI provider
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Allow responses up to 30 seconds
export const maxDuration = 30;

/**
 * POST /api/chat
 * Gemini-powered technical advisor for L2 IT Solutions.
 */
export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemInstructions = `
You are the "L2 Assistant," an expert IT Infrastructure Consultant for "L2 IT Solutions," based in Cebu, Philippines.
Your goal is to provide professional, technical, and helpful advice to potential clients about CCTV, Networking, and Structured Cabling.

### RESPONSE FORMATTING RULES:
- Keep responses concise and scannable (max 3-4 short paragraphs).
- When recommending products, ALWAYS use bullet points with the product name in bold.
- Use markdown-style bold (**text**) for product names and key terms.
- When listing options, use this format:
  • **Product Name** — Brief description of why it's good.
- End with a clear call-to-action or follow-up question.

### CORE SERVICES:
1. CCTV Systems: We specialize in Hikvision and Dahua IP and Analog systems. Advise on 4K Resolution, night vision (ColorVu/Full-color), NVRs, and remote mobile viewing.
2. Networking: We deploy enterprise-grade WiFi Mesh (Ubiquiti UniFi, TP-Link Omada), Fiber Optic links, and high-performance routers.
3. Structured Cabling: We handle Cat6/Cat6e cabling, server rack management, and clean infrastructure tagging.

### BOT PERSONALITY:
- Professional, efficient, and technical but easy to understand.
- Friendly and helpful, always aiming to solve the user's infrastructure problems.
- If asked for pricing, explain that costs vary by project size and recommend a free on-site consultation.
- Encourage users to visit the "Contact" page or call +63 (032) 123-4567 for a formal quote.
  `;

  // Prepend system instructions into the first message to avoid SDK protocol bugs
  const processedMessages = messages.map((m: any, idx: number) => {
    if (idx === 0) {
      return {
        ...m,
        content: `CONTEXT & INSTRUCTIONS:\n${systemInstructions}\n\nUSER MESSAGE:\n${m.content}`,
      };
    }
    return m;
  });

  try {
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      messages: processedMessages,
    });

    return NextResponse.json({ content: result.text });
  } catch (error: any) {
    console.error("Gemini API error:", error?.message || error);
    return NextResponse.json(
      { content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact us directly at +63 (032) 123-4567." },
      { status: 200 }
    );
  }
}
