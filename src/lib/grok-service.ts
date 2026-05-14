export interface GrokMessage {
  role: "user" | "assistant";
  content: string;
}

export interface LeadData {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const GROQ_MODEL = "llama-3.1-8b-instant";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "xnjwbebn";

const SYSTEM_PROMPT = `You are a smart sales assistant for TriTech Forge, an AI voice automation platform for home services and trade businesses.

Your job: Answer questions briefly, and when a user wants a demo or to book a call, collect their info naturally — one question at a time.

Info to collect (in order, only when relevant):
1. Full name
2. Business name
3. Email address
4. Phone number
5. Industry (HVAC, Plumbing, Electrical, Roofing, Car Dealership, Real Estate, etc.)

Rules:
- Keep all responses SHORT (1-3 sentences max)
- Never ask for all info at once — one question at a time
- Once you have all 5 fields, respond with EXACTLY this on its own line:
LEAD_READY:{"name":"...","business":"...","email":"...","phone":"...","industry":"..."}
- If user asks about services/pricing, answer briefly then offer a demo
- Be friendly and conversational

Services: AI receptionist, outbound calling, appointment scheduling, lead qualification. Pricing from $100/mo.`;

export async function submitLeadToFormspree(lead: LeadData): Promise<boolean> {
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...lead,
        message: lead.message || "Demo request submitted via chatbot",
        _subject: `Demo Request from ${lead.business} (via chatbot)`,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function extractLeadFromResponse(text: string): LeadData | null {
  const match = text.match(/LEAD_READY:(\{[^}]+\})/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]) as LeadData;
  } catch {
    return null;
  }
}

export async function sendMessageToGrok(messages: GrokMessage[]): Promise<string> {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      const errMsg = json?.error?.message || res.statusText;
      console.error("Groq error:", res.status, errMsg);
      if (res.status === 429) return "Too many requests — please wait a moment and try again.";
      return `Error: ${errMsg}`;
    }

    return json.choices?.[0]?.message?.content || "No response received.";

  } catch (err) {
    console.error("Groq fetch error:", err);
    return "Unable to connect. Please try again later.";
  }
}
