/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE. Nothing else needs touching to change
 *  the copy, the career acts, the skills, or the projects.
 * ─────────────────────────────────────────────────────────────
 */

const email = "deepdevvyas@gmail.com";
const linkedin = "https://www.linkedin.com/in/deepdev-vyas/";

/** Free live-screenshot service, the same one already used in the Notion portfolio's own project previews. */
const shot = (url: string, wait = 4) => `https://image.thum.io/get/width/1280/wait/${wait}/${url}`;

export const profile = {
  name: "Deepdev Vyas",
  role: "Product Manager",
  discipline: "Fintech & AI products",
  tagline: "I make complicated things feel obvious.",
  subline:
    "Four acts, one through-line: build it, question it, then decide what deserves to exist.",
  location: "Bangalore, India",
  email,
  links: [
    { label: "Email", value: email, href: `mailto:${email}`, note: "Fastest route" },
    { label: "LinkedIn", value: "/in/deepdev-vyas", href: linkedin, note: "Longer stories" },
    { label: "Résumé", value: "PDF, one page", href: "/Deepdev_Vyas_PM_Resume.pdf", note: "The formal version" },
  ],
  availability: "Open to fintech PM roles in Bangalore",
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
    years: "2018–2022",
    org: "VIT Vellore",
    role: "B.Tech, Electrical & Electronics",
    line: "I learned how systems fall apart.",
    body:
      "Four years of circuits, signals, and labs taught me the habit that never left: take the black box apart, name every component, then explain it to someone else. Graduated 8.57/10, but the real takeaway was learning how to learn something hard, fast.",
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
    years: "2022–2023",
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
    years: "2023–2025",
    org: "Adobe",
    role: "Discovery & delivery, enterprise accounts",
    line: "I learned that the brief is never the problem.",
    body:
      "Sat with customers, watched them struggle, and traced drop-off through funnels in SQL and Adobe Analytics. Rewrote an onboarding flow from 14 steps to 9 and took completion from 40% to 78%. The lesson: people don't want features, they want the confusing part to stop.",
    points: [
      "The brief is a symptom; the workflow is the problem.",
      "People don't want features, they want the confusion to stop.",
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
    years: "2026–now",
    org: "Begig",
    role: "Product Manager, AI engagements",
    line: "Now I decide what gets made, and what doesn't.",
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
  githubUrl?: string;
  liveUrl?: string;
  /** Internal route, e.g. a live console built into this site. */
  href?: string;
  thumbnail?: string;
};

export const projects: Project[] = [
  {
    id: "recon-console",
    index: "01",
    title: "The 0.4% That Never Reconciles",
    subtitle: "Settlement reconciliation console",
    org: "Personal · Self-initiated",
    year: "2026",
    role: "Product, design, build",
    tags: ["Payments", "Reconciliation", "Ledger", "SQL"],
    headline:
      "12,600 orders a month, 95 that don't match the bank file, and one spreadsheet standing between a merchant and their money. I built the console that decides which ₹1.4L deserves a human.",
    metrics: [
      { value: "99.3%", label: "auto-matched, no touch" },
      { value: "₹1.40L", label: "open exposure" },
      { value: "95", label: "breaks to work" },
    ],
    caseStudy: [
      {
        step: "Problem",
        text:
          "A payment aggregator settles T+1, but the bank file never quite equals the order book. At 12,600 captures a month, roughly 95 rows don't match, and an ops analyst reconciles them in a spreadsheet while month-end close waits.",
      },
      {
        step: "Discovery",
        text:
          "Mapped capture → MDR and GST → batch → bank settlement → merchant ledger. Breaks collapse into eight types, and most of the rows are timing or rounding noise. The real exposure sits in two codes. Triage by rupees, not row count.",
      },
      {
        step: "Define",
        text:
          "Three matching passes, a ₹1 written tolerance, a T+2 timing window, and a closed reason-code vocabulary with a named owner per code. Deliberately no ML and no auto-journaling: every break stays explainable to an auditor.",
      },
      {
        step: "Deliver",
        text:
          "Built a seeded synthetic month (12,600 captures, 8 merchants, 4 channels, UPI at zero MDR, cards at 1.95% + 18% GST, ₹12 netbanking) with eight injected break types, plus a working console: filters, break detail, ageing, charts and CSV export.",
      },
      {
        step: "Measure",
        text:
          "12,670 rows reconcile to 95 exceptions and ₹1.40L open, 0.39% of ₹3.57Cr processed. 99.3% match with no human touch, and every remaining row carries a reason code, an owner and an age.",
      },
    ],
    differently:
      "Treat late or partial settlement files as a first-class failure mode, and put the journal posting behind an approval gate instead of stopping at the ops queue.",
    featured: true,
    href: "/work/recon",
  },
  {
    id: "rag-support",
    index: "02",
    title: "The Support Agent That Knew Its Limits",
    subtitle: "RAG-based Tier-1 support chatbot",
    org: "Begig · SaaS client",
    year: "2026",
    role: "Product Manager · discovery + delivery",
    tags: ["RAG", "Pinecone", "LLM Eval", "PRD"],
    headline:
      "200+ repetitive tickets a day, 48-hour replies, and a client terrified of hallucination. Eight weeks later the bot was deflecting half of it, with citations.",
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
  },
  {
    id: "voice-agent",
    index: "03",
    title: "Answering in 30 Seconds, Not 4 Hours",
    subtitle: "AI voice agent for insurance lead qualification",
    org: "Begig · Insurance client",
    year: "2026",
    role: "Product Manager · end to end",
    tags: ["Voice AI", "ElevenLabs", "Twilio", "GoHighLevel"],
    headline:
      "A 4.2-hour callback window was leaking 35% of paid inbound leads. The fix wasn't more reps. It was answering the phone.",
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
    index: "04",
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
          "A 14-step setup wizard with no progress bar and no save. 60% of new users never finished, and marketing teams, the least technical audience, churned hardest.",
      },
      {
        step: "Discovery",
        text:
          "Funnel analysis in Adobe Analytics pinned 28% abandonment on step seven, content model setup. Eight user interviews said the same three things: overwhelming, unclear value, no way back.",
      },
      {
        step: "Define",
        text:
          "Break setup into three progressive stages: Setup, Configure, Launch. Ship the smallest cut that proves it: progress indicator, 14 steps to 9, inline documentation.",
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
    index: "05",
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
      "Prototype the failure states first: dead battery, no signal, someone leaves the group, because that's where coordination products actually earn trust.",
    liveUrl: "https://google-journey.lovable.app/",
    thumbnail: shot("https://google-journey.lovable.app/", 6),
  },
  {
    id: "saathi-credit",
    index: "06",
    title: "The Consent Screen Competitors Skip",
    subtitle: "Lending product design for India's new-to-credit borrowers",
    org: "Personal · Solo PM + designer",
    year: "2026",
    role: "Product design, PRD, architecture, prototype",
    tags: ["Fintech", "PRD", "Prototype", "Compliance"],
    headline:
      "I benchmarked 7 Indian lenders and ran a real application through the best-designed one. It rejected a plausible applicant with no explanation, and fired an undisclosed hard credit check before showing a consent screen.",
    metrics: [
      { value: "7", label: "lenders benchmarked" },
      { value: "1 of 7", label: "offer a true credit line" },
      { value: "1", label: "undisclosed credit-check bug found" },
    ],
    caseStudy: [
      {
        step: "Problem",
        text:
          "A benchmark of seven lenders (three fintechs, four banks/NBFCs) across product, onboarding, features, and traction found every one underwrites against a bureau file or income floor. A thin or absent credit history is treated as a rejection, not a servable case.",
      },
      {
        step: "Discovery",
        text:
          "Ran a real application through the best-designed funnel in the set instead of reading marketing pages. It rejected a plausible applicant with no explanation, and fired an undisclosed hard bureau check the moment identity details were submitted, confirmed by a real-time SMS, with no consent screen shown first.",
      },
      {
        step: "Define",
        text:
          "Wrote a full PRD: a north-star metric tying disbursal to on-time repayment, prioritised requirements, an MVP sequencing plan, and a compliance table against RBI's Digital Lending Guidelines, India's DPDP Act, the Account Aggregator framework, and KYC regulation.",
      },
      {
        step: "Deliver",
        text:
          "Mapped the backend API sequence from authentication through disbursal and built a clickable prototype covering both approved and declined borrower journeys, centred on a consent screen that states exactly what gets checked, and whether it's a soft or hard pull, before it runs.",
      },
      {
        step: "Measure",
        text:
          "Real click-path testing on my own prototype, not just a static design, surfaced a genuine double-fire bug on a custom checkbox: the kind of defect that ships invisibly when a design is only described, not tested.",
      },
    ],
    differently:
      "Validate the compliance table with an actual RBI-licensed Account Aggregator partner before finalising the architecture, not after.",
  },
];

export type SideProject = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  numbers: { value: string; label: string }[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
};

export const sideProjects: SideProject[] = [
  {
    id: "skillaxy",
    title: "Skillaxy",
    tagline: "A skill-transferability engine, not an LLM guessing your next career",
    problem:
      "The early version let an LLM free-form career advice from two job titles, inventing skills and stepping-stone roles that didn't exist. Replaced it with a transferability engine computed from real O*NET occupational data and real BLS salary data: capability vectors, distinctiveness-weighted overlap scoring, and shortest-path stepping-stone routing through an interactive, pannable skill galaxy, explainable and reproducible instead of guessed.",
    numbers: [
      { value: "460+", label: "careers mapped, real BLS salaries" },
      { value: "0", label: "LLM-invented skills left in the output" },
    ],
    stack: ["React", "TypeScript", "Supabase", "Python", "O*NET data"],
    githubUrl: "https://github.com/deep195/galaxy",
    liveUrl: "https://galaxy-zeta-brown.vercel.app",
    thumbnail: shot("https://galaxy-zeta-brown.vercel.app/", 8),
  },
  {
    id: "oauth-setup-guides",
    title: "OAuth Setup Guides",
    tagline: "Tells you what it actually takes to register your own OAuth app",
    problem:
      "A developer wiring up a third-party integration has no upfront way to know whether registering an OAuth app is a 10-minute form or a multi-week enterprise review: that answer is scattered across each provider's own docs. Built a library of pre-generated guides plus a live pipeline that researches, drafts, and fact-checks a guide for any app on demand, flagging every claim it can't verify as \"not specified\" instead of guessing.",
    numbers: [
      { value: "14", label: "providers pre-generated, zero API calls" },
      { value: "4", label: "pipeline stages, self fact-checked" },
    ],
    stack: ["Next.js", "TypeScript", "Readability", "DuckDuckGo search"],
    githubUrl: "https://github.com/deep195/oauth-setup-guides",
    liveUrl: "https://oauth-setup-guides-one.vercel.app",
    thumbnail: shot("https://oauth-setup-guides-one.vercel.app/"),
  },
  {
    id: "weight-of-bridges",
    title: "The Weight of Bridges",
    tagline: "A RAG chatbot that proves its safety guardrails instead of claiming them",
    problem:
      "Most RAG demos assert their system is safe. This one measures it: an 8-chapter original story covering serious adult themes is served to 5 personas (Child, Adult, Doctor, Engineer, Finance), and an evals dashboard scores a baseline run with guardrails off against the hardened pipeline, showing the actual score delta the safety layer produces, not just a claim that it works.",
    numbers: [
      { value: "5", label: "personas, one shared knowledge base" },
      { value: "2", label: "pipelines scored: baseline vs. hardened" },
    ],
    stack: ["Next.js", "Supabase pgvector", "Groq", "OpenRouter"],
    githubUrl: "https://github.com/deep195/chatbot",
    liveUrl: "https://weight-of-bridges.vercel.app",
    thumbnail: shot("https://weight-of-bridges.vercel.app/"),
  },
  {
    id: "voice-agent",
    title: "Local Voice Agent",
    tagline: "A voice assistant with no API keys and no per-token bill",
    problem:
      "Cloud voice assistants mean an API key, an account, and a bill per token. Built a push-to-talk agent that runs entirely on a laptop: faster-whisper hears, a local Ollama model thinks, Kokoro speaks, with a live dashboard for retuning every voice parameter (pacing, pauses, breath) while it's still mid-sentence, with nothing restarting.",
    numbers: [
      { value: "$0", label: "per-token cost, fully offline" },
      { value: "3", label: "local models chained, zero cloud calls" },
    ],
    stack: ["Python", "faster-whisper", "Ollama", "Kokoro TTS"],
    githubUrl: "https://github.com/deep195/voice-agent",
  },
  {
    id: "project-chat",
    title: "Project Chat",
    tagline: "A Slack mirror that strips sensitive data before a freelancer ever sees it",
    problem:
      "Sharing a Slack channel with an external freelancer means sharing everything in it: money, rates, credentials, client identity. Built a filtered, read-only mirror: a regex-plus-optional-LLM pipeline blocks sensitive messages before they publish, holds anything flagged in a moderation queue, and can relay approved messages on to WhatsApp.",
    numbers: [
      { value: "<3s", label: "webhook signature-verify & ack" },
      { value: "4s", label: "feed refresh interval" },
    ],
    stack: ["Next.js", "Supabase", "Slack API", "WhatsApp Cloud API"],
    liveUrl: "https://slack-relay-inky.vercel.app",
    thumbnail: shot("https://slack-relay-inky.vercel.app/"),
  },
  {
    id: "fridge-chef",
    title: "Fridge Chef",
    tagline: "Turns \"what do I cook tonight?\" into a 10-second decision",
    problem:
      "Staring at a fridge full of random ingredients with no plan wastes both food and time. Built an AI app that takes what's actually in your fridge and returns three cookable recipes, ranked by how few extra ingredients you'd need to buy, not a generic recipe dump that assumes a fully stocked kitchen.",
    numbers: [
      { value: "3", label: "recipes, ranked by fewest extra buys" },
      { value: "10s", label: "from ingredients list to a decision" },
    ],
    stack: ["Lovable", "AI recipe ranking"],
    liveUrl: "https://fridge-chef-ai-05.lovable.app",
    thumbnail: shot("https://fridge-chef-ai-05.lovable.app/", 5),
  },
];

// Product teardowns and practice case studies from the Notion portfolio:
// scoped exercises (1–2 weeks each), not shipped software, so no GitHub/live
// product link, but real problem statements worth showing, with whatever
// reference link each one has (a deck, or external recognition).
export type Teardown = {
  name: string;
  category: string;
  problem: string;
  timeToComplete: string;
  link?: string;
};

export const teardowns: Teardown[] = [
  {
    name: "TrendTreasure × Onboarding",
    category: "Teardown · featured",
    problem:
      "A personalised onboarding flow for one retail platform serving three different audiences at once: logistics partners (B2B), shoppers (B2C), and store owners (B2B & B2C).",
    timeToComplete: "2 weeks",
    link: "https://www.theproductfolks.com/teardown-winners/simran-vazirani-deepdev-vyas",
  },
  {
    name: "Urban Company × Cooks",
    category: "Teardown",
    problem:
      "Extending Urban Company into everyday home food: a service for booking a local cook, designed around how people actually decide what's for dinner.",
    timeToComplete: "2 weeks",
    link: "https://drive.google.com/file/d/19jTpLwNPN-zQK9C7zeA-iOt-aiuUVnn9/view?usp=drive_link",
  },
  {
    name: "Improving Zepto's Retention",
    category: "Teardown",
    problem:
      "A built-in cost-splitting feature for group orders, cutting the payment friction that was the real reason repeat group orders dropped off.",
    timeToComplete: "1 week",
    link: "https://drive.google.com/file/d/17hrCfHnF5dHpJipDU9yi0l37JOHg1kFL/view?usp=drive_link",
  },
  {
    name: "Improving Swiggy's Order Volume",
    category: "Teardown",
    problem:
      "Growing order volume in a target user segment by sharpening food discovery and delivery-time reliability, backed by deeper demographic insight.",
    timeToComplete: "1 week",
    link: "https://drive.google.com/file/d/11Y15D7ZMug_BMf2AAHA_C4eTS6Q1vXvW/view?usp=drive_link",
  },
  {
    name: "Rapido × Metro",
    category: "Academic",
    problem:
      "A competitor and metrics analysis on whether Rapido should host metro ticketing inside its own app, or leave that ground to single-purpose apps.",
    timeToComplete: "1 week",
    link: "https://drive.google.com/file/d/1UDdrE2UhDQDUx7jmnigkZ_84i7-hmVTj/view",
  },
  {
    name: "MMT × AI",
    category: "Academic",
    problem:
      "Raising search-to-booking conversion on MakeMyTrip by scoping one new or improved feature, backed by user research and a customer journey map.",
    timeToComplete: "1 week",
    link: "https://drive.google.com/file/d/1p43bJsJZH_hUzA0PKpiLNA4I0xUhczWV/view?usp=sharing",
  },
];

export const archive = [
  { title: "GenAI internal tooling", detail: "Team of the Quarter, Nov 2024", org: "Adobe" },
  { title: "Insurjo 2024: AI insurance concept", detail: "3rd place, 48-hour hackathon", org: "TPF × Descope" },
  { title: "Product teardown decks", detail: "Top 100, featured", org: "The Product Folks" },
];

export const certifications = [
  "Machine Learning Fundamentals",
  "Upraised Product Management",
  "Silver IoT Domain Specialist, Level 8",
  "Neural Networks and Deep Learning",
];

export const nav = [
  { label: "The Reel", href: "#reel" },
  { label: "The Hands", href: "#hands" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
