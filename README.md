# Content Calendar Builder (MVP)

Deterministic, SEO-first content planning for Web3 affiliate sites. No paid APIs. Includes crawl fallback to manual inputs, affiliate link placeholders, compliance snippets, and export-ready outputs.

## Features
- URL + project setup with manual mode fallback
- Sitemap generator with keywords, intent, internal links, CTA placements
- 4-week + 12-week content calendar (SEO + social + newsletter)
- Export: CSV, JSON, Markdown, Notion-ready CSV
- SQLite persistence via Prisma
- Unit tests for generators

## Tech
- Next.js (App Router) + TypeScript + Tailwind
- Prisma + SQLite
- Cheerio for basic HTML parsing

## Run Locally
1. Install dependencies

```bash
npm install
```

2. Set up the database

```bash
npm run prisma:migrate -- --name init
npm run prisma:generate
```

3. Seed example project

```bash
npm run prisma:seed
```

4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Tests
```bash
npm test
```

## Notes
- Crawl is best-effort. If blocked, use Manual Inputs.
- Affiliate CTA placeholders: `{AFFILIATE_LINK}` with UTM parameters built in.
- Compliance disclaimer added to each calendar item by default.
