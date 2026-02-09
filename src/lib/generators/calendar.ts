import { v4 as uuid } from "uuid";
import { CalendarItem, ProjectInput, SitemapNode } from "../types";

const compliance =
  "Not financial advice. Crypto assets are volatile and may result in loss of capital. Check local regulations before trading.";

const affiliateLink = "{AFFILIATE_LINK}?utm_source=content_calendar&utm_medium=affiliate&utm_campaign={CAMPAIGN}";

const contentTemplates = [
  {
    type: "longform" as const,
    effort: "L" as const,
    repurpose: ["2x social shorts", "newsletter feature"],
    outline: ["Overview", "Key benefits", "Pricing & fees", "How to get started", "Pros & cons", "FAQ"]
  },
  {
    type: "comparison" as const,
    effort: "M" as const,
    repurpose: ["comparison carousel", "email teaser"],
    outline: ["Who this is for", "Feature comparison", "Fee breakdown", "Security checklist", "Verdict"]
  },
  {
    type: "how_to" as const,
    effort: "M" as const,
    repurpose: ["short tutorial", "cheat-sheet PDF"],
    outline: ["Prerequisites", "Step-by-step", "Common mistakes", "Tips", "CTA"]
  },
  {
    type: "social_short" as const,
    effort: "S" as const,
    repurpose: ["TikTok", "IG Reels", "Shorts"],
    outline: ["Hook", "3 quick points", "CTA" ]
  },
  {
    type: "newsletter" as const,
    effort: "S" as const,
    repurpose: ["weekly recap", "blog intro"],
    outline: ["Subject line", "Top 3 takeaways", "CTA"]
  }
];

const funnelMap: Record<string, "TOFU" | "MOFU" | "BOFU"> = {
  longform: "MOFU",
  comparison: "BOFU",
  how_to: "TOFU",
  social_short: "TOFU",
  newsletter: "MOFU"
};

const intentMap: Record<string, string> = {
  longform: "informational",
  comparison: "commercial investigation",
  how_to: "informational",
  social_short: "informational",
  newsletter: "informational"
};

export function generateCalendar(
  input: ProjectInput,
  sitemap: SitemapNode[],
  weeks: number
): CalendarItem[] {
  const items: CalendarItem[] = [];
  const today = new Date();

  for (let i = 0; i < weeks; i += 1) {
    const baseDate = new Date(today);
    baseDate.setDate(today.getDate() + i * 7);

    const pick = contentTemplates[i % contentTemplates.length];
    const page = sitemap[i % sitemap.length];

    const titleBase = page?.title ?? `${input.exchangeName} review`;
    const contentTitle =
      pick.type === "social_short"
        ? `60s ${titleBase} highlight`
        : pick.type === "newsletter"
          ? `${input.exchangeName} weekly signal: ${page.primaryKeyword}`
          : pick.type === "comparison"
            ? `${titleBase} vs top alternatives`
            : pick.type === "how_to"
              ? `How to use ${input.exchangeName} for ${page.primaryKeyword}`
              : `${titleBase} deep dive`;

    const publishDate = new Date(baseDate);
    publishDate.setDate(baseDate.getDate() + 2);

    items.push({
      id: uuid(),
      week: i + 1,
      publishDate: publishDate.toISOString().split("T")[0],
      title: contentTitle,
      contentType: pick.type,
      outline: pick.outline,
      targetKeyword: page?.primaryKeyword ?? `${input.exchangeName} review`,
      intent: intentMap[pick.type],
      funnelStage: funnelMap[pick.type],
      cta: `Open an account on ${input.exchangeName} with our partner link`,
      affiliateLink,
      internalLinks: page?.internalLinks ?? [],
      effort: pick.effort,
      repurposeTo: pick.repurpose,
      complianceNote: compliance
    });
  }

  return items;
}
