# Things to fill in or replace

## Personal details: `src/config/site.ts`

- [ ] `name` (currently "Your Name")
- [ ] `email` (currently `hello@example.com`; also used in security.txt)
- [ ] `links.linkedin`
- [ ] `lookingFor`: the roles you're targeting
- [ ] Review `headline`, `tagline`, `description`
- [ ] `securityTxtExpires`: keep it under a year out and set a reminder to renew it

## Domain

- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel (and `.env.local`) to your real domain
- [ ] Update the placeholder URL in `.github/workflows/ci.yml` (build env + SecureScan job)
- [ ] After HTTPS works on all subdomains, submit to hstspreload.org

## Content

- [ ] `content/projects/securescan.mdx`: real results/metrics, check the demo URL
- [ ] `content/projects/home-soc-lab.mdx`: fill the TODOs as the lab progresses
- [ ] Replace or delete `phishing-analyzer.mdx` and `secure-notes-api.mdx` (and their lines in `content/projects/index.ts`)
- [ ] Rewrite or replace the sample blog post (`content/blog/…strict-csp.mdx`)
- [ ] About page bio and certifications: `src/app/about/page.tsx`
- [ ] Home "About" blurb: `src/app/page.tsx`
- [ ] Skills list: `src/config/skills.ts`

## Images and files

- [ ] `public/resume.pdf` (currently a one-line placeholder PDF)
- [ ] Project covers and architecture diagrams in `public/images/projects/*/` (placeholders are SVG; PNG/JPG/WebP also work)
- [ ] Blog image `public/images/blog/csp-nonce-flow.svg`
- [ ] Favicon: `src/app/icon.svg` (optional)
- [ ] README screenshot

## Optional: contact form

- [ ] Create a Resend account, verify your domain, set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`
- [ ] Create a free Upstash Redis database, set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- [ ] Without these the site shows a mailto button instead, which is a fine default

## After deploying

- [ ] securityheaders.com → expect A+
- [ ] SSL Labs → expect A+ (graded on Vercel's TLS setup)
- [ ] Lighthouse (mobile and desktop) on home, a case study and a blog post
- [ ] Enable "Dependabot security updates" in GitHub repo settings
- [ ] Uncomment the SecureScan job in CI once the action is published
