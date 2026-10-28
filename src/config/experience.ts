// Experience & education timeline on the About page, newest first.
// TODO: replace the placeholder entries with your real history. `period` is free text.
export type TimelineEntry = {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights?: string[];
};

export const experience: TimelineEntry[] = [
  {
    role: "Senior Cybersecurity Engineer (placeholder)",
    org: "Company name",
    period: "2024 — Present",
    summary:
      "One or two sentences on your scope: what you secure, who you work with, what you own.",
    highlights: [
      "A measurable result, e.g. cut critical findings by X% after introducing a secure SDLC",
      "A tool, process or detection you built",
    ],
  },
  {
    role: "Web Designer & Developer (placeholder)",
    org: "Company name / Freelance",
    period: "2021 — 2024",
    summary: "Design and build of client sites and web apps with Laravel, PHP and Next.js.",
    highlights: ["Notable project or client", "Something you improved (speed, security, sales)"],
  },
];

export const education: TimelineEntry[] = [
  {
    role: "Degree or diploma (placeholder)",
    org: "Institution",
    period: "Year — Year",
    summary: "Course, focus area or relevant coursework.",
  },
];
