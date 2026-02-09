import * as cheerio from "cheerio";

export type CrawlResult = {
  title: string;
  headings: string[];
  navLinks: string[];
  footerLinks: string[];
};

const normalize = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();

export async function crawlSite(url: string): Promise<CrawlResult> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Content Calendar Builder MVP; +https://example.com)"
    }
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const title = normalize($("title").first().text()) || "";
  const headings = $("h1, h2")
    .map((_, el) => normalize($(el).text()))
    .get()
    .filter(Boolean);

  const navLinks = $("nav a")
    .map((_, el) => normalize($(el).text()))
    .get()
    .filter(Boolean);

  const footerLinks = $("footer a")
    .map((_, el) => normalize($(el).text()))
    .get()
    .filter(Boolean);

  return {
    title,
    headings: Array.from(new Set(headings)).slice(0, 30),
    navLinks: Array.from(new Set(navLinks)).slice(0, 30),
    footerLinks: Array.from(new Set(footerLinks)).slice(0, 30)
  };
}
