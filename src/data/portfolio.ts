/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE. Nothing else needs touching to change
 *  the copy, the career acts, the skills, or the projects.
 * ─────────────────────────────────────────────────────────────
 */

const email = "deepdevvyas@gmail.com";
const linkedin = "https://linkedin.com/in/deepdevvyas";

export const profile = {
  name: "Deepdev Vyas",
  role: "Product Manager",
  discipline: "AI & LLM-powered products",
  tagline: "I make complicated things feel obvious.",
  subline:
    "Four acts, one through-line: build it, question it, then decide what deserves to exist.",
  location: "Bangalore, India",
  email,
  links: [
    { label: "Email", value: email, href: `mailto:${email}`, note: "Fastest route" },
    { label: "LinkedIn", value: "/in/deepdevvyas", href: linkedin, note: "Longer stories" },
    { label: "Résumé", value: "PDF, one page", href: "#", note: "The formal version" },
  ],
  availability: "Open to PM roles in AI-native teams",
};

export type Pose = "student" | "engineer" | "consultant" | "pm" | "speaker";

export type Act = {
  id: string;
  numeral: string;
  kicker: string;
  title: string;
  years: string;
  org: string;
  role: string;
  line: string;
  body: string;
  points: string[];
  stat: { value: string; label: string };
  pose: Pose;
  tint: string; // css color used for the scene wash
};

export const acts: Act[] = [
  {
    id: "act-1",
    numeral: "I",
    kicker: "Act One",
    title: "The Student",
    years: "2018 — 2022",
    org: "VIT Vellore",
    role: "B.Tech, Electrical & Electronics",
    line: "I learned how systems fall apart.",
    body:
      "Four years of circuits, signals, and labs taught me the habit that never left: take the black box apart, name every component, then explain it to someone else. Graduated 8.57/10 — but the real takeaway was learning how to learn something hard, fast.",
    points: [
      "Take the black box apart before you judge it.",
      "Name every component out loud.",
      "The real skill was learning fast, not the syllabus.",
    ],
    stat: { value: "8.57", label: "CGPA, out of 10" },
    pose: "student",
    tint: "#C08A2E",
  },
  {
    id: "act-2",
    numeral: "II",
    kicker: "Act Two",
    title: "The Engineer",
    years: "2022 — 2023",
    org: "Adobe",
    role: "Associate Technical Consultant",
    line: "I learned how things actually get made.",
    body:
      "Shipped seven web products on AEM and AEMaaCS, then owned eight customer-facing features end to end. I stopped asking what the product should do and started asking what it costs to build, what breaks in production, and which edge case the spec forgot.",
    points: [
      "Ask what it costs to build, not just what it should do.",
      "Production breaks on the edge case the spec forgot.",
      "Seven things shipped beats seven ideas debated.",
    ],
    stat: { value: "7", label: "products launched" },
    pose: "engineer",
    tint: "#2C6A5D",
  },
  {
    id: "act-3",
    numeral: "III",
    kicker: "Act Three",
    title: "The Consultant",
    years: "2023 — 2025",
    org: "Adobe",
    role: "Discovery & delivery, enterprise accounts",
    line: "I learned that the brief is never the problem.",
    body:
      "Sat with customers, watched them struggle, and traced drop-off through funnels in SQL and Adobe Analytics. Rewrote an onboarding flow from 14 steps to 9 and took completion from 40% to 78%. The lesson: people don't want features, they want the confusing part to stop.",
    points: [
      "The brief is a symptom; the workflow is the problem.",
      "People don't want features — they want the confusion to stop.",
      "Cut 14 steps to 9 and completion doubled.",
    ],
    stat: { value: "3×", label: "ROI on key accounts" },
    pose: "consultant",
    tint: "#63456E",
  },
  {
    id: "act-4",
    numeral: "IV",
    kicker: "Act Four",
    title: "The Product Manager",
    years: "2026 — now",
    org: "Begig",
    role: "Product Manager, AI engagements",
    line: "Now I decide what gets made — and what doesn't.",
    body:
      "Run five to eight concurrent AI engagements across fintech, SaaS, and commerce: RAG assistants, voice agents, workflow automation. I scope the MVP, write the PRD, sit in the eval loop, and ship things that survive contact with real users and real invoices.",
    points: [
      "Scope the MVP before the demo gets flattering.",
      "Sit in the eval loop, not above it.",
      "Ship what survives real users and real invoices.",
    ],
    stat: { value: "5–8", label: "engagements run in parallel" },
    pose: "pm",
    tint: "#C94C24",
  },
];

export type Skill = {
  label: string;
  cluster: "Product" | "AI & Systems" | "Data" | "Delivery";
  angle: number; // 0 = straight up, -ve = left
  length: number; // arm length in svg units
};

/** Ten arms. Angles fan behind the body, roughly 200° of arc. */
export const skills: Skill[] = [
  { label: "Strategy", cluster: "Product", angle: -92, length: 196 },
  { label: "Discovery", cluster: "Product", angle: -71, length: 224 },
  { label: "RICE", cluster: "Product", angle: -50, length: 206 },
  { label: "RAG", cluster: "AI & Systems", angle: -29, length: 232 },
  { label: "LLM Eval", cluster: "AI & Systems", angle: -9, length: 214 },
  { label: "Prompt Eng", cluster: "AI & Systems", angle: 11, length: 226 },
  { label: "SQL", cluster: "Data", angle: 31, length: 210 },
  { label: "A/B Testing", cluster: "Data", angle: 52, length: 228 },
  { label: "PRDs", cluster: "Delivery", angle: 72, length: 202 },
  { label: "Stakeholders", cluster: "Delivery", angle: 92, length: 190 },
];

export const skillClusters = [
  {
    name: "Product",
    blurb: "Deciding what deserves to exist.",
    items: ["Strategy", "Roadmapping", "Discovery", "User research", "PRDs", "RICE / MoSCoW", "OKRs", "GTM"],
  },
  {
    name: "AI & Systems",
    blurb: "Knowing what the demo hides.",
    items: ["RAG systems", "Vector DBs", "LLM evaluation", "MCP architecture", "Prompt engineering", "Voice agents", "n8n", "REST APIs"],
  },
  {
    name: "Data",
    blurb: "Arguing with evidence, not volume.",
    items: ["SQL", "A/B testing", "Funnel analysis", "Cohort analysis", "Mixpanel", "Adobe Analytics", "GA4"],
  },
  {
    name: "Delivery",
    blurb: "Getting it out the door intact.",
    items: ["Agile / Scrum", "Stakeholder management", "Sprint planning", "Cross-functional leadership", "Vendor coordination", "SOP design"],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  org: string;
  year: string;
  role: string;
  tags: string[];
  headline: string;
  metrics: { value: string; label: string }[];
  caseStudy: { step: string; text: string }[];
  differently: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "rag-support",
    index: "01",
    title: "The Support Agent That Knew Its Limits",
    subtitle: "RAG-based Tier-1 support chatbot",
    org: "Begig · SaaS client",
    year: "2026",
    role: "Product Manager — discovery + delivery",
    tags: ["RAG", "Pinecone", "LLM Eval", "PRD"],
    headline:
      "200+ repetitive tickets a day, 48-hour replies, and a client terrified of hallucination. Eight weeks later the bot was deflecting half of it — with citations.",
    metrics: [
      { value: "52%", label: "deflection rate" },
      { value: "1.3%", label: "hallucination rate" },
      { value: "4.2", label: "CSAT held" },
    ],
    caseStudy: [
      {
        step: "Problem",
        text:
          "Support was drowning in Tier-1 repeat questions while response times sat at 48 hours. The client needed deflection without inventing answers or leaking data.",
      },
      {
        step: "Discovery",
        text:
          "Interviewed 5 agents and 3 account managers, then read three months of tickets. 65% were repeatable. Set the bar before building: deflection above 40%, hallucination under 2%, CSAT no lower than 4.0.",
      },
      {
        step: "Define",
        text:
          "PRD for a grounded RAG bot over the client's own knowledge base: 50 articles, Slack channel for internal testing, confidence thresholds, and a hard escalation path to a human. RICE put citations and memory above everything else.",
      },
      {
        step: "Deliver",
        text:
          "Four sprints with 2 developers and 1 designer. Defined the chunking strategy, prompt templates, and three rounds of QA with the actual support team before soft launch.",
      },
      {
        step: "Measure",
        text:
          "52% deflection against a 40% target. Hallucinations at 1.3%. CSAT held at 4.2, and the team recovered roughly 15 hours a week for the genuinely hard cases.",
      },
    ],
    differently:
      "Start with 20 articles instead of 50 to learn faster, and put the thumbs-up/down feedback loop in on day one rather than week three.",
    featured: true,
  },
  {
    id: "voice-agent",
    index: "02",
    title: "Answering in 30 Seconds, Not 4 Hours",
    subtitle: "AI voice agent for insurance lead qualification",
    org: "Begig · Insurance client",
    year: "2026",
    role: "Product Manager — end to end",
    tags: ["Voice AI", "ElevenLabs", "Twilio", "GoHighLevel"],
    headline:
      "A 4.2-hour callback window was leaking 35% of paid inbound leads. The fix wasn't more reps — it was answering the phone.",
    metrics: [
      { value: "<30s", label: "speed to lead" },
      { value: "88%", label: "qualification accuracy" },
      { value: "+41%", label: "lead → meeting" },
    ],
    caseStudy: [
      {
        step: "Problem",
        text:
          "Paid campaigns generated leads that expected an immediate reply. Reps could handle 40 calls a day and callbacks averaged 4.2 hours, so a third of the pipeline cooled off before anyone spoke to it.",
      },
      {
        step: "Discovery",
        text:
          "Shadowed 3 reps for two days. 70% of calls followed the same five-question script, and speed-to-lead inside five minutes tripled conversion. The bottleneck was latency, not skill.",
      },
      {
        step: "Define",
        text:
          "An agent that handles the five qualification questions, books straight onto a rep's calendar, and warm-transfers anything messy. Integrations scoped to Twilio, ElevenLabs, and GoHighLevel.",
      },
      {
        step: "Deliver",
        text:
          "Designed conversation flows with 12 decision branches and explicit fallbacks, prototyped in two weeks, then iterated tone with the client. A/B tested against human reps across 200 leads.",
      },
      {
        step: "Measure",
        text:
          "Speed-to-lead under 30 seconds, qualification accuracy at 88% against 91% for humans, and +41% lead-to-meeting conversion in the agent cohort. Reps got about 3 hours a day back for closing.",
      },
    ],
    differently:
      "Add sentiment detection earlier so frustrated callers escalate themselves, and give the client a live performance dashboard instead of a weekly report.",
  },
  {
    id: "onboarding",
    index: "03",
    title: "Fourteen Steps Down to Nine",
    subtitle: "Onboarding flow redesign, Adobe Experience Manager",
    org: "Adobe · Enterprise",
    year: "2024",
    role: "Associate Technical Consultant",
    tags: ["Funnel analysis", "A/B testing", "Adobe Analytics", "UX"],
    headline:
      "New users were giving up at step seven. We cut the wizard in half, added a way back, and completion went from 40% to 78%.",
    metrics: [
      { value: "78%", label: "completion, was 40%" },
      { value: "−35%", label: "time to first publish" },
      { value: "−42%", label: "onboarding tickets" },
    ],
    caseStudy: [
      {
        step: "Problem",
        text:
          "A 14-step setup wizard with no progress bar and no save. 60% of new users never finished, and marketing teams — the least technical audience — churned hardest.",
      },
      {
        step: "Discovery",
        text:
          "Funnel analysis in Adobe Analytics pinned 28% abandonment on step seven, content model setup. Eight user interviews said the same three things: overwhelming, unclear value, no way back.",
      },
      {
        step: "Define",
        text:
          "Break setup into three progressive stages — Setup, Configure, Launch — and ship the smallest cut that proves it: progress indicator, 14 steps to 9, inline documentation.",
      },
      {
        step: "Deliver",
        text:
          "Wrote the PRD, ran 3 sprints with 2 engineers and 1 designer, and defined a 500-user-per-cohort A/B test with UAT across 5 beta customers.",
      },
      {
        step: "Measure",
        text:
          "Completion 40% → 78%. Time to first publish down 35%. Onboarding support tickets down 42%. The activation lift contributed to 3× ROI on key enterprise accounts.",
      },
    ],
    differently:
      "Replace tooltips with interactive walkthroughs on the genuinely hard steps, and use progressive profiling so we stop asking for everything up front.",
  },
  {
    id: "google-journeys",
    index: "04",
    title: "Google Journeys",
    subtitle: "Group travel concept for Google Maps",
    org: "Personal · Solo PM + designer",
    year: "2024",
    role: "Concept, research, prototype",
    tags: ["0→1", "Concept", "Figma", "Research"],
    headline:
      "Maps is brilliant at getting one person somewhere. Coordinating six people still takes three apps and a group chat argument.",
    metrics: [
      { value: "200K+", label: "impressions in 3 days" },
      { value: "780+", label: "likes" },
      { value: "Top 100", label: "teardown decks" },
    ],
    caseStudy: [
      {
        step: "Problem",
        text:
          "Group road trips fall apart in the coordination layer: who's driving, where to meet, whose ETA is real, and where everyone wants to eat.",
      },
      {
        step: "Discovery",
        text:
          "Surveyed 30 travelers. 78% called group trip planning frustrating and used three or more apps to do it. The insight: the unmet need is coordination and group decision-making, not navigation.",
      },
      {
        step: "Define",
        text:
          "A group travel mode inside Maps: shared route with live ETAs, polling on stops, driver/navigator roles, and in-trip chat that never leaves the map.",
      },
      {
        step: "Deliver",
        text:
          "Twelve-screen Figma prototype and a written walkthrough of the reasoning, posted publicly with the trade-offs spelled out rather than hidden.",
      },
      {
        step: "Measure",
        text:
          "200K+ impressions and 780+ likes in three days, 45+ substantive comments, and a spot in The Product Folks' Top 100 Product Teardown Decks.",
      },
    ],
    differently:
      "Prototype the failure states first — dead battery, no signal, someone leaves the group — because that's where coordination products actually earn trust.",
  },
];

export const archive = [
  { title: "GenAI internal tooling", detail: "Team of the Quarter, Nov 2024", org: "Adobe" },
  { title: "Insurjo 2024 — AI insurance concept", detail: "3rd place, 48-hour hackathon", org: "TPF × Descope" },
  { title: "Product teardown decks", detail: "Top 100, featured", org: "The Product Folks" },
];

export const nav = [
  { label: "The Reel", href: "#reel" },
  { label: "The Hands", href: "#hands" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
