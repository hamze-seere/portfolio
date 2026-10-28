// Skills shown on the home page. Plain tags on purpose: self-rated percentage bars mean nothing.
export const skillGroups = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "HTML & accessibility", "MDX"],
  },
  {
    title: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL", "Python", "PHP / Laravel", "zod"],
  },
  {
    title: "Security tools",
    items: [
      "Burp Suite",
      "OWASP ZAP",
      "Nmap",
      "Wireshark",
      "Wazuh",
      "Sysmon",
      "Kali Linux",
      "Metasploit",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: ["Vercel", "GitHub Actions", "Docker", "Linux", "Nginx", "DNS & email auth"],
  },
] as const;
