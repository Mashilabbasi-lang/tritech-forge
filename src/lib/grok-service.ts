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

// All chat calls go through our backend — the Groq API key never touches the browser
const BASE = import.meta.env.VITE_CRM_API_URL || "http://localhost:3001";
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "meaqdwew";

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
    const res = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const json = await res.json();

    if (!res.ok) {
      if (res.status === 429) return "Too many requests — please wait a moment and try again.";
      return `Error: ${json?.error || res.statusText}`;
    }

    return json.content || "No response received.";
  } catch (err) {
    console.error("Chat fetch error:", err);
    return "Unable to connect. Please try again later.";
  }
}
