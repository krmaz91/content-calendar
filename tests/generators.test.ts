import { describe, expect, it } from "vitest";
import { generateSitemap } from "../src/lib/generators/sitemap";
import { generateCalendar } from "../src/lib/generators/calendar";
import { ProjectInput } from "../src/lib/types";

const input: ProjectInput = {
  exchangeName: "OrbitX",
  websiteUrl: "https://orbitx.test",
  targetCountries: ["US"],
  languages: ["English"],
  audienceLevel: "beginner",
  primaryOffers: ["spot", "staking"],
  affiliateModel: "cpa",
  manualMode: true,
  manualNotes: "Example notes"
};

describe("generators", () => {
  it("creates sitemap nodes with slugs and keywords", () => {
    const sitemap = generateSitemap(input);
    expect(sitemap.length).toBeGreaterThan(5);
    expect(sitemap[0].slug).toContain("orbitx");
    expect(sitemap[0].primaryKeyword).toContain("orbitx");
  });

  it("creates calendar items for 12 weeks", () => {
    const sitemap = generateSitemap(input);
    const calendar = generateCalendar(input, sitemap, 12);
    expect(calendar).toHaveLength(12);
    expect(calendar[0].affiliateLink).toContain("{AFFILIATE_LINK}");
    expect(calendar[0].complianceNote).toContain("Not financial advice");
  });
});
