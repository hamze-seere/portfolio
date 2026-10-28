// Skills shown on the home page. Plain tags on purpose: self-rated percentage bars mean nothing.
export const skillGroups = [
  {
    title: "Frontend & design",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web design & UI",
      "Responsive layouts",
      "HTML & accessibility",
    ],
  },
  {
    title: "Backend",
    items: ["Laravel", "PHP", "Python", "Node.js", "REST APIs", "MySQL / PostgreSQL"],
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
