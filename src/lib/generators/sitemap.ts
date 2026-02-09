import { v4 as uuid } from "uuid";
import { CrawlResult } from "../crawler";
import { ProjectInput, SitemapNode, FunnelStage } from "../types";

const basePages = [
  "Review",
  "Fees",
  "Security",
  "KYC",
  "Supported Countries",
  "Alternatives",
  "How-to Guides",
  "Promo/Bonus",
  "Compare vs"
];

const offerHubs: Record<string, string[]> = {
  staking: ["staking rewards", "locked staking", "flexible earn"],
  futures: ["futures trading", "perpetuals", "leverage"],
  spot: ["spot trading", "maker taker fees", "liquidity"],
  cards: ["crypto card", "cashback", "spending"],
  "copy trading": ["copy trading", "top traders", "auto follow"],
  "on-ramp": ["buy crypto", "fiat on-ramp", "bank transfer"],
  earn: ["earn", "savings", "yield"],
  launchpad: ["launchpad", "token sales", "early access"]
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const intentForPage = (title: string): { intent: string; stage: FunnelStage } => {
  if (/review|compare|alternatives/.test(title.toLowerCase())) {
    return { intent: "commercial investigation", stage: "MOFU" };
  }
  if (/fees|promo|bonus|security|kyc/.test(title.toLowerCase())) {
    return { intent: "transactional", stage: "BOFU" };
  }
  if (/how-to|guides|supported/.test(title.toLowerCase())) {
    return { intent: "informational", stage: "TOFU" };
  }
  return { intent: "informational", stage: "TOFU" };
};

const ctaPlacements = [
  "Above the fold CTA button",
  "Mid-article comparison table",
  "FAQ box with sign-up CTA",
  "Sticky sidebar banner"
];

export function generateSitemap(
  input: ProjectInput,
  crawl?: CrawlResult
): SitemapNode[] {
  const exchange = input.exchangeName;
  const extraKeywords = [
    ...(crawl?.headings ?? []),
    ...(input.manualNotes ? input.manualNotes.split(/[,\\n]/) : [])
  ]
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 6);

  const coreNodes = basePages.map((page) => {
    const title = `${exchange} ${page}`;
    const { intent, stage } = intentForPage(page);
    return {
      id: uuid(),
      title,
      slug: `/${slugify(exchange)}/${slugify(page)}`,
      primaryKeyword: `${exchange} ${page}`.toLowerCase(),
      secondaryKeywords: [
        `${exchange} features`,
        `${exchange} pros and cons`,
        `${exchange} fees`,
        ...extraKeywords
      ],
      intent,
      funnelStage: stage,
      internalLinks: [],
      ctaPlacements
    } satisfies SitemapNode;
  });

  const offerNodes = input.primaryOffers.flatMap((offer) => {
    const key = offer.toLowerCase();
    const keywords = offerHubs[key] ?? [offer.toLowerCase()];
    const title = `${exchange} ${offer} Hub`;
    const { intent, stage } = intentForPage("how-to");

    return {
      id: uuid(),
      title,
      slug: `/${slugify(exchange)}/${slugify(offer)}-hub`,
      primaryKeyword: `${exchange} ${offer}`.toLowerCase(),
      secondaryKeywords: keywords,
      intent,
      funnelStage: stage,
      internalLinks: [],
      ctaPlacements
    } satisfies SitemapNode;
  });

  const crawlNodes = (crawl?.navLinks ?? []).slice(0, 6).map((link) => {
    const title = `${exchange} ${link}`;
    const { intent, stage } = intentForPage(link);
    return {
      id: uuid(),
      title,
      slug: `/${slugify(exchange)}/${slugify(link)}`,
      primaryKeyword: `${exchange} ${link}`.toLowerCase(),
      secondaryKeywords: [link.toLowerCase(), "features", "benefits"],
      intent,
      funnelStage: stage,
      internalLinks: [],
      ctaPlacements
    } satisfies SitemapNode;
  });

  const nodes = [...coreNodes, ...offerNodes, ...crawlNodes];

  const titles = nodes.map((n) => n.title);
  const nodesWithLinks = nodes.map((node) => ({
    ...node,
    internalLinks: titles.filter((title) => title !== node.title).slice(0, 4)
  }));

  return nodesWithLinks;
}
