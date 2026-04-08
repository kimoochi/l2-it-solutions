import { NextResponse } from "next/server";

// Allow responses up to 30 seconds
export const maxDuration = 30;

/**
 * POST /api/chat
 * Groq-powered technical advisor for L2 IT Solutions.
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

  try {
    // Groq requires strictly the role and content fields.
    const strictMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstructions },
          ...strictMessages
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const replyText = data.choices[0].message.content;

    return NextResponse.json({ content: replyText });
  } catch (error: any) {
    console.error("Groq API error:", error?.message || error);
    return NextResponse.json(
      { content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact us directly at +63 (032) 123-4567." },
      { status: 200 }
    );
  }
}
