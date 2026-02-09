import { CalendarItem, ProjectInput, SitemapNode } from "../types";

const joinBullets = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

const formatInternalLinks = (links: string[]) =>
  links.length ? links.map((link) => `- ${link}`).join("\n") : "- (add internal links)";

export function buildDraft(
  item: CalendarItem,
  input: ProjectInput,
  sitemap: SitemapNode[]
): string {
  const primary = item.targetKeyword;
  const related = sitemap
    .filter((node) => node.primaryKeyword !== primary)
    .slice(0, 4)
    .map((node) => node.title);

  const affiliateCta = `\n**CTA:** ${item.cta}\n\n**Affiliate link:** ${item.affiliateLink}\n`;

  const compliance = `\n> ${item.complianceNote}\n`;

  const meta = [
    `Title: ${item.title}`,
    `Publish date: ${item.publishDate}`,
    `Target keyword: ${item.targetKeyword}`,
    `Intent: ${item.intent}`,
    `Funnel stage: ${item.funnelStage}`,
    `Primary offer focus: ${input.primaryOffers.join(", ")}`,
    `Audience: ${input.audienceLevel}`
  ].join("\n");

  if (item.contentType === "social_short") {
    return [
      `# ${item.title}`,
      "",
      meta,
      "",
      "## Script",
      "- Hook:",
      "- Value point 1:",
      "- Value point 2:",
      "- Value point 3:",
      "- CTA:",
      "",
      "## On-screen text",
      joinBullets([
        `Use ${input.exchangeName} for ${primary}`,
        "Fast setup",
        "Transparent fees",
        "Risk reminder"
      ]),
      "",
      affiliateCta,
      compliance
    ].join("\n");
  }

  if (item.contentType === "newsletter") {
    return [
      `# ${item.title}`,
      "",
      meta,
      "",
      "## Subject line ideas",
      joinBullets([
        `${input.exchangeName}: ${primary} in 5 minutes`,
        `This week’s ${input.exchangeName} moves`,
        `Quick win: ${primary}`
      ]),
      "",
      "## Body",
      "- Intro: why this matters now",
      "- Key takeaway 1",
      "- Key takeaway 2",
      "- Key takeaway 3",
      "- CTA section",
      "",
      "## Internal links",
      formatInternalLinks(related),
      affiliateCta,
      compliance
    ].join("\n");
  }

  if (item.contentType === "comparison") {
    return [
      `# ${item.title}`,
      "",
      meta,
      "",
      "## Overview",
      `- What ${input.exchangeName} does best for ${primary}`,
      "- Who should consider alternatives",
      "",
      "## Feature comparison",
      "- Trading fees",
      "- Product depth",
      "- Compliance and KYC",
      "- Regional availability",
      "",
      "## Verdict",
      "- Best for:",
      "- Not ideal for:",
      "",
      "## Internal links",
      formatInternalLinks(related),
      affiliateCta,
      compliance
    ].join("\n");
  }

  if (item.contentType === "how_to") {
    return [
      `# ${item.title}`,
      "",
      meta,
      "",
      "## Prerequisites",
      joinBullets([
        "Verified account",
        "Funding method set up",
        "Security settings enabled"
      ]),
      "",
      "## Step-by-step",
      joinBullets([
        "Open account and complete KYC",
        `Navigate to ${primary}`,
        "Choose amount and confirm",
        "Track performance and adjust"
      ]),
      "",
      "## Common mistakes",
      joinBullets([
        "Ignoring fees",
        "Skipping 2FA",
        "Over-allocating risk"
      ]),
      "",
      "## Internal links",
      formatInternalLinks(related),
      affiliateCta,
      compliance
    ].join("\n");
  }

  return [
    `# ${item.title}`,
    "",
    meta,
    "",
    "## Overview",
    `Explain ${input.exchangeName} and why ${primary} matters for this audience.`,
    "",
    "## Key benefits",
    joinBullets([
      "Transparent fees",
      "Security controls",
      "Strong liquidity",
      "Beginner-friendly onboarding"
    ]),
    "",
    "## Pricing & fees",
    "- Fee tiers",
    "- Deposit/withdrawal costs",
    "- Hidden costs checklist",
    "",
    "## How to get started",
    joinBullets([
      "Create account",
      "Complete KYC",
      "Fund wallet",
      "Execute first trade"
    ]),
    "",
    "## FAQ",
    joinBullets([
      "Is it available in my region?",
      "How long does verification take?",
      "What are the withdrawal limits?"
    ]),
    "",
    "## Internal links",
    formatInternalLinks(related),
    affiliateCta,
    compliance
  ].join("\n");
}

export function buildDraftBundle(
  items: CalendarItem[],
  input: ProjectInput,
  sitemap: SitemapNode[]
): string {
  return items
    .map((item) => buildDraft(item, input, sitemap))
    .join("\n\n---\n\n");
}
