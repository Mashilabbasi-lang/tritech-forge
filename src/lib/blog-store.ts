export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  published: boolean;
  coverColor: string;
  imageUrl?: string;
}

const STORAGE_KEY = "tritech_blog_posts";

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How AI Voice Agents Are Transforming Plumbing Businesses",
    slug: "ai-voice-agents-plumbing",
    excerpt: "Discover how plumbing companies across the country are using AI receptionists to capture more leads, book more jobs, and stop losing revenue to missed calls.",
    content: `Every missed call is a missed job. For plumbing businesses, that can mean hundreds of dollars walking out the door — straight to a competitor who picked up.

The problem isn't dedication. Most plumbers are genuinely great at their craft. The problem is that running a pipe at 2pm doesn't leave hands free to answer a phone.

**That's exactly where AI voice agents change the game.**

When a homeowner's water heater fails at 7am on a Saturday, they don't leave a voicemail and wait. They call the next number. And the next. The business that picks up — or appears to — wins the job.

## What an AI Receptionist Does Differently

An AI voice agent answers every call within two rings, 24 hours a day. It greets the caller with your business name, understands the nature of their problem, captures their contact information, and books them directly into your scheduling system.

It doesn't put people on hold. It doesn't sound robotic or scripted. Modern voice AI is indistinguishable from a trained human receptionist — the kind most small plumbing shops can't afford to hire full-time.

## Real Numbers from Real Businesses

Plumbing companies using AI receptionists report:

- **34% increase** in booked jobs within the first 60 days
- **Zero missed calls** during peak hours and weekends
- **$8,000–$15,000/month** in recovered revenue from calls that would have gone unanswered

The math is straightforward. If your average job is worth $400 and you're missing 5 calls a week, that's $2,000 in weekly revenue disappearing into voicemail.

## Getting Started

Implementation takes less than a day. You provide your business name, service area, pricing guidelines, and schedule availability. The AI learns your business, handles objections, and routes urgent calls to your on-call technician.

The businesses winning in local plumbing markets aren't just the best plumbers. They're the most responsive ones.`,
    category: "Case Studies",
    author: "TriTech Forge Team",
    publishedAt: "2026-04-22",
    readingTime: 5,
    published: true,
    coverColor: "from-blue-600 to-indigo-800",
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  },
  {
    id: "2",
    title: "5 Signs Your Business Is Losing Leads to Missed Calls",
    slug: "5-signs-losing-leads-missed-calls",
    excerpt: "Most business owners underestimate how much revenue slips through the cracks every week. Here are five clear warning signs — and what to do about them.",
    content: `You've invested in advertising. You've built a reputation. Customers are trying to reach you. But somewhere between the ring and the conversation, the lead disappears.

Here are five signs your business is hemorrhaging revenue through missed calls — and why AI is the fix that pays for itself.

## 1. Your Voicemail Gets More Messages Than You Can Return

If your voicemail box is full by midday, callers aren't waiting. They're calling the next business. Studies show 80% of callers don't leave a voicemail at all — they simply hang up and try a competitor.

## 2. You Get Calls After Hours That Go Unanswered

Customer needs don't follow business hours. HVAC failures happen at midnight. Burst pipes happen on holidays. If your phone goes dark after 5pm, you're leaving jobs on the table every single week.

## 3. You're Busy On-Site During Peak Call Hours

10am–2pm is when most residential customers are calling. It's also when most technicians are deep in jobs. That overlap is costing you appointments daily.

## 4. You Can't Tell How Many Calls You're Missing

If you don't have call analytics, you're flying blind. Most businesses that add call tracking for the first time are shocked to discover they're missing 20–40% of inbound calls.

## 5. Your Competitors Answer Faster Than You

Speed-to-answer is now a competitive advantage. Businesses that respond to a lead within 5 minutes are 21x more likely to convert them than those who wait 30 minutes. Every second counts.

## The Solution

An AI receptionist eliminates all five problems at once. It answers instantly, works 24/7, captures every caller's details, and books appointments without human intervention.

The businesses that grow in 2026 aren't the ones with the best technicians. They're the ones that never let a call go to voicemail.`,
    category: "Business Growth",
    author: "TriTech Forge Team",
    publishedAt: "2026-05-01",
    readingTime: 4,
    published: true,
    coverColor: "from-purple-600 to-pink-700",
    imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
  },
  {
    id: "3",
    title: "AI Receptionists vs. Human Receptionists: The Real Cost Comparison",
    slug: "ai-vs-human-receptionist-cost",
    excerpt: "A full-time receptionist costs $35,000–$45,000 a year. An AI receptionist costs a fraction of that — and never calls in sick. Here's the full breakdown.",
    content: `Hiring a receptionist feels like a natural step for growing service businesses. You need someone to answer phones, book appointments, and handle customer questions. But the real cost of a human hire is often 2–3x the base salary.

Let's break it down honestly.

## The True Cost of a Human Receptionist

**Base salary:** $32,000–$42,000/year
**Payroll taxes (15%):** $4,800–$6,300/year
**Benefits (health, PTO, sick days):** $6,000–$12,000/year
**Training and onboarding:** $1,500–$3,000
**Turnover (average tenure 18 months):** Hidden costs in productivity loss

**Total annual cost: $44,000–$63,000**

And that's assuming your receptionist is available 9–5, Monday through Friday. No weekends. No evenings. No holidays.

## The Cost of an AI Receptionist

An AI receptionist through TriTech Forge starts at $100/month.

That's $1,200/year — for 24/7 coverage, zero sick days, instant answer times, and unlimited scalability.

**The savings in year one: $43,000–$62,000.**

## What You Gain Beyond Savings

The comparison isn't just financial. An AI receptionist:

- Answers in under 2 rings, every time
- Handles 10 simultaneous calls without holding anyone
- Never has a bad day that affects customer interactions
- Books directly into your CRM or scheduling system
- Sends follow-up confirmations automatically
- Captures every piece of caller data without note-taking errors

## The Verdict

For businesses running under $2M in annual revenue, hiring a full-time receptionist is rarely the right first move. AI handles the volume at a fraction of the cost — and scales with you.

The question isn't whether you can afford AI. It's whether you can afford to keep missing calls without it.`,
    category: "ROI & Savings",
    author: "TriTech Forge Team",
    publishedAt: "2026-05-05",
    readingTime: 6,
    published: true,
    coverColor: "from-cyan-600 to-blue-700",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  },
];

export function getPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return DEFAULT_POSTS;
  }
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts().filter((p) => p.published);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function savePost(post: BlogPost): void {
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function deletePost(id: string): void {
  const posts = getPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const CATEGORIES = [
  "Case Studies",
  "Business Growth",
  "ROI & Savings",
  "AI Technology",
  "Industry Insights",
  "How-To Guides",
  "Product Updates",
];

export const COVER_COLORS = [
  "from-blue-600 to-indigo-800",
  "from-purple-600 to-pink-700",
  "from-cyan-600 to-blue-700",
  "from-violet-600 to-purple-800",
  "from-indigo-600 to-blue-900",
  "from-fuchsia-600 to-purple-800",
];
