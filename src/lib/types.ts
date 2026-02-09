export type AudienceLevel = "beginner" | "advanced";
export type AffiliateModel = "cpa" | "rev_share" | "hybrid";
export type FunnelStage = "TOFU" | "MOFU" | "BOFU";
export type ContentType =
  | "longform"
  | "comparison"
  | "how_to"
  | "social_short"
  | "newsletter";

export type ProjectInput = {
  exchangeName: string;
  websiteUrl: string;
  targetCountries: string[];
  languages: string[];
  audienceLevel: AudienceLevel;
  primaryOffers: string[];
  affiliateModel: AffiliateModel;
  manualMode: boolean;
  manualNotes?: string;
};

export type SitemapNode = {
  id: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  funnelStage: FunnelStage;
  internalLinks: string[];
  ctaPlacements: string[];
  children?: SitemapNode[];
};

export type CalendarItem = {
  id: string;
  week: number;
  publishDate: string;
  title: string;
  contentType: ContentType;
  outline: string[];
  targetKeyword: string;
  intent: string;
  funnelStage: FunnelStage;
  cta: string;
  affiliateLink: string;
  internalLinks: string[];
  effort: "S" | "M" | "L";
  repurposeTo: string[];
  complianceNote: string;
  aiNotes?: string;
};

export type ProjectData = {
  id?: string;
  input: ProjectInput;
  sitemap: SitemapNode[];
  calendar: CalendarItem[];
  createdAt?: string;
};
