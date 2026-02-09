import { CalendarItem, ProjectData, SitemapNode } from "../types";

const csvEscape = (value: string) => {
  const normalized = value.replace(/\r?\n/g, " ").replace(/"/g, '""');
  return `"${normalized}"`;
};

export function calendarToCsv(items: CalendarItem[]): string {
  const headers = [
    "week",
    "publish_date",
    "title",
    "content_type",
    "funnel_stage",
    "target_keyword",
    "intent",
    "cta",
    "affiliate_link",
    "internal_links",
    "effort",
    "repurpose_to",
    "compliance"
  ];

  const rows = items.map((item) => [
    item.week.toString(),
    item.publishDate,
    item.title,
    item.contentType,
    item.funnelStage,
    item.targetKeyword,
    item.intent,
    item.cta,
    item.affiliateLink,
    item.internalLinks.join(" | "),
    item.effort,
    item.repurposeTo.join(" | "),
    item.complianceNote
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => csvEscape(value)).join(","))
    .join("\n");
}

export function calendarToNotionCsv(items: CalendarItem[]): string {
  const headers = [
    "Name",
    "Publish Date",
    "Content Type",
    "Funnel Stage",
    "Keyword",
    "CTA",
    "Effort",
    "Notes"
  ];

  const rows = items.map((item) => [
    item.title,
    item.publishDate,
    item.contentType,
    item.funnelStage,
    item.targetKeyword,
    item.cta,
    item.effort,
    item.complianceNote
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => csvEscape(value)).join(","))
    .join("\n");
}

export function projectToJson(data: ProjectData): string {
  return JSON.stringify(data, null, 2);
}

export function sitemapToMarkdown(nodes: SitemapNode[]): string {
  return nodes
    .map((node) => {
      const lines = [
        `# ${node.title}`,
        "",
        `Slug: ${node.slug}`,
        `Primary keyword: ${node.primaryKeyword}`,
        `Secondary keywords: ${node.secondaryKeywords.join(", ")}`,
        `Search intent: ${node.intent}`,
        `Funnel stage: ${node.funnelStage}`,
        `Internal links: ${node.internalLinks.join(", ")}`,
        `CTA placements: ${node.ctaPlacements.join(", ")}`,
        "",
        "## Outline",
        "- H2: Overview",
        "- H2: Key features",
        "- H2: Fees & limits",
        "- H2: Security & compliance",
        "- H2: How to get started",
        "- H2: FAQs",
        ""
      ];
      return lines.join("\n");
    })
    .join("\n");
}
