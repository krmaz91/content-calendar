import { CalendarItem, ProjectInput, SitemapNode } from "../types";
import { resolveLanguage, strings } from "../i18n";

const joinBullets = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

const formatInternalLinks = (links: string[]) =>
  links.length ? links.map((link) => `- ${link}`).join("\n") : "- (add internal links)";

export function buildDraft(
  item: CalendarItem,
  input: ProjectInput,
  sitemap: SitemapNode[]
): string {
  const lang = resolveLanguage(input);
  const t = strings[lang];
  const primary = item.targetKeyword;
  const related = sitemap
    .filter((node) => node.primaryKeyword !== primary)
    .slice(0, 4)
    .map((node) => node.title);

  const affiliateCta =
    lang === "ja"
      ? `\n**${t.sections.cta}:** ${item.cta}\n\n**アフィリエイトリンク:** ${item.affiliateLink}\n`
      : `\n**CTA:** ${item.cta}\n\n**Affiliate link:** ${item.affiliateLink}\n`;

  const compliance = `\n> ${item.complianceNote}\n`;

  const meta = [
    `${t.meta.title}: ${item.title}`,
    `${t.meta.publishDate}: ${item.publishDate}`,
    `${t.meta.targetKeyword}: ${item.targetKeyword}`,
    `${t.meta.intent}: ${item.intent}`,
    `${t.meta.funnelStage}: ${item.funnelStage}`,
    `${t.meta.primaryOffers}: ${input.primaryOffers.join(", ")}`,
    `${t.meta.audience}: ${input.audienceLevel}`
  ].join("\n");

  if (item.contentType === "social_short") {
    return [
      `# ${item.title}`,
      "",
      meta,
      "",
      `## ${t.sections.script}`,
      lang === "ja" ? "- フック:" : "- Hook:",
      lang === "ja" ? "- 価値ポイント1:" : "- Value point 1:",
      lang === "ja" ? "- 価値ポイント2:" : "- Value point 2:",
      lang === "ja" ? "- 価値ポイント3:" : "- Value point 3:",
      lang === "ja" ? "- CTA:" : "- CTA:",
      "",
      `## ${t.sections.onScreen}`,
      joinBullets([
        lang === "ja"
          ? `${input.exchangeName}で${primary}を始める`
          : `Use ${input.exchangeName} for ${primary}`,
        lang === "ja" ? "簡単な設定" : "Fast setup",
        lang === "ja" ? "明瞭な手数料" : "Transparent fees",
        lang === "ja" ? "リスク注意" : "Risk reminder"
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
      `## ${t.sections.subjectLines}`,
      joinBullets([
        lang === "ja"
          ? `${input.exchangeName}: ${primary}を5分で把握`
          : `${input.exchangeName}: ${primary} in 5 minutes`,
        lang === "ja"
          ? `${input.exchangeName} 今週の動き`
          : `This week’s ${input.exchangeName} moves`,
        lang === "ja" ? `クイックウィン: ${primary}` : `Quick win: ${primary}`
      ]),
      "",
      `## ${t.sections.body}`,
      lang === "ja" ? "- 導入: いま重要な理由" : "- Intro: why this matters now",
      lang === "ja" ? "- 重要ポイント1" : "- Key takeaway 1",
      lang === "ja" ? "- 重要ポイント2" : "- Key takeaway 2",
      lang === "ja" ? "- 重要ポイント3" : "- Key takeaway 3",
      lang === "ja" ? "- CTA" : "- CTA section",
      "",
      `## ${t.sections.internalLinks}`,
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
      `## ${t.sections.overview}`,
      lang === "ja"
        ? `- ${input.exchangeName}が${primary}で優れている点`
        : `- What ${input.exchangeName} does best for ${primary}`,
      lang === "ja" ? "- 代替を検討すべき人" : "- Who should consider alternatives",
      "",
      `## ${t.sections.featureComparison}`,
      lang === "ja" ? "- 取引手数料" : "- Trading fees",
      lang === "ja" ? "- 商品ラインナップ" : "- Product depth",
      lang === "ja" ? "- コンプライアンス/KYC" : "- Compliance and KYC",
      lang === "ja" ? "- 対応地域" : "- Regional availability",
      "",
      `## ${t.sections.verdict}`,
      lang === "ja" ? "- 最適なユーザー:" : "- Best for:",
      lang === "ja" ? "- 向かないユーザー:" : "- Not ideal for:",
      "",
      `## ${t.sections.internalLinks}`,
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
      `## ${t.sections.prerequisites}`,
      joinBullets([
        lang === "ja" ? "本人確認済みアカウント" : "Verified account",
        lang === "ja" ? "入金方法の設定" : "Funding method set up",
        lang === "ja" ? "セキュリティ設定" : "Security settings enabled"
      ]),
      "",
      `## ${t.sections.steps}`,
      joinBullets([
        lang === "ja" ? "口座開設とKYCを完了" : "Open account and complete KYC",
        lang === "ja" ? `${primary}へ移動` : `Navigate to ${primary}`,
        lang === "ja" ? "金額を選んで確定" : "Choose amount and confirm",
        lang === "ja" ? "パフォーマンスを確認し調整" : "Track performance and adjust"
      ]),
      "",
      `## ${t.sections.commonMistakes}`,
      joinBullets([
        lang === "ja" ? "手数料の見落とし" : "Ignoring fees",
        lang === "ja" ? "2FA未設定" : "Skipping 2FA",
        lang === "ja" ? "リスク過多" : "Over-allocating risk"
      ]),
      "",
      `## ${t.sections.internalLinks}`,
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
    `## ${t.sections.overview}`,
    lang === "ja"
      ? `${input.exchangeName}と${primary}が重要な理由を説明する。`
      : `Explain ${input.exchangeName} and why ${primary} matters for this audience.`,
    "",
    `## ${t.sections.keyBenefits}`,
    joinBullets([
      lang === "ja" ? "明瞭な手数料" : "Transparent fees",
      lang === "ja" ? "強固なセキュリティ" : "Security controls",
      lang === "ja" ? "高い流動性" : "Strong liquidity",
      lang === "ja" ? "初心者向けオンボーディング" : "Beginner-friendly onboarding"
    ]),
    "",
    `## ${t.sections.pricingFees}`,
    lang === "ja" ? "- 手数料ティア" : "- Fee tiers",
    lang === "ja" ? "- 入出金コスト" : "- Deposit/withdrawal costs",
    lang === "ja" ? "- 隠れコストの確認" : "- Hidden costs checklist",
    "",
    `## ${t.sections.getStarted}`,
    joinBullets([
      lang === "ja" ? "口座開設" : "Create account",
      lang === "ja" ? "KYC完了" : "Complete KYC",
      lang === "ja" ? "入金" : "Fund wallet",
      lang === "ja" ? "初回取引" : "Execute first trade"
    ]),
    "",
    `## ${t.sections.faq}`,
    joinBullets([
      lang === "ja" ? "自分の地域で利用可能?" : "Is it available in my region?",
      lang === "ja" ? "本人確認にかかる時間は?" : "How long does verification take?",
      lang === "ja" ? "出金上限はいくら?" : "What are the withdrawal limits?"
    ]),
    "",
    `## ${t.sections.internalLinks}`,
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
