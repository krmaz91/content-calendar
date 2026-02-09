import { v4 as uuid } from "uuid";
import { CalendarItem, ProjectInput, SitemapNode } from "../types";
import { resolveLanguage, strings } from "../i18n";

const affiliateLink =
  "{AFFILIATE_LINK}?utm_source=content_calendar&utm_medium=affiliate&utm_campaign={CAMPAIGN}";

const contentTemplates = [
  {
    type: "longform" as const,
    effort: "L" as const,
    repurpose: ["2x social shorts", "newsletter feature"]
  },
  {
    type: "comparison" as const,
    effort: "M" as const,
    repurpose: ["comparison carousel", "email teaser"]
  },
  {
    type: "how_to" as const,
    effort: "M" as const,
    repurpose: ["short tutorial", "cheat-sheet PDF"]
  },
  {
    type: "social_short" as const,
    effort: "S" as const,
    repurpose: ["TikTok", "IG Reels", "Shorts"]
  },
  {
    type: "newsletter" as const,
    effort: "S" as const,
    repurpose: ["weekly recap", "blog intro"]
  }
];

const outlineMap = {
  en: {
    longform: ["Overview", "Key benefits", "Pricing & fees", "How to get started", "Pros & cons", "FAQ"],
    comparison: ["Who this is for", "Feature comparison", "Fee breakdown", "Security checklist", "Verdict"],
    how_to: ["Prerequisites", "Step-by-step", "Common mistakes", "Tips", "CTA"],
    social_short: ["Hook", "3 quick points", "CTA"],
    newsletter: ["Subject line", "Top 3 takeaways", "CTA"]
  },
  ja: {
    longform: ["概要", "主なメリット", "料金・手数料", "始め方", "メリット/デメリット", "FAQ"],
    comparison: ["対象者", "機能比較", "料金比較", "セキュリティチェック", "結論"],
    how_to: ["事前準備", "手順", "よくある失敗", "コツ", "CTA"],
    social_short: ["フック", "要点3つ", "CTA"],
    newsletter: ["件名", "重要ポイント3つ", "CTA"]
  }
} as const;

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
  const lang = resolveLanguage(input);
  const t = strings[lang];
  const compliance = t.notFinancialAdvice as string;

  for (let i = 0; i < weeks; i += 1) {
    const baseDate = new Date(today);
    baseDate.setDate(today.getDate() + i * 7);

    const pick = contentTemplates[i % contentTemplates.length];
    const page = sitemap[i % sitemap.length];

    const titleBase = page?.title ?? `${input.exchangeName} review`;
    const contentTitle =
      pick.type === "social_short"
        ? t.titles.social(titleBase)
        : pick.type === "newsletter"
          ? t.titles.newsletter(input.exchangeName, page.primaryKeyword)
          : pick.type === "comparison"
            ? t.titles.comparison(titleBase)
            : pick.type === "how_to"
              ? t.titles.howTo(input.exchangeName, page.primaryKeyword)
              : t.titles.deepDive(titleBase);

    const publishDate = new Date(baseDate);
    publishDate.setDate(baseDate.getDate() + 2);

    items.push({
      id: uuid(),
      week: i + 1,
      publishDate: publishDate.toISOString().split("T")[0],
      title: contentTitle,
      contentType: pick.type,
      outline: outlineMap[lang][pick.type],
      targetKeyword: page?.primaryKeyword ?? `${input.exchangeName} review`,
      intent: intentMap[pick.type],
      funnelStage: funnelMap[pick.type],
      cta: t.cta(input.exchangeName),
      affiliateLink,
      internalLinks: page?.internalLinks ?? [],
      effort: pick.effort,
      repurposeTo: pick.repurpose,
      complianceNote: compliance
    });
  }

  return items;
}
