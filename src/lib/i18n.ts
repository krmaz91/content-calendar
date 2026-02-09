import { ProjectInput } from "./types";

export type SupportedLanguage = "en" | "ja";

const normalize = (value?: string) => (value ?? "").trim().toLowerCase();

export function resolveLanguage(input: ProjectInput): SupportedLanguage {
  const first = input.languages[0] ?? "english";
  const normalized = normalize(first);
  if (normalized.includes("japanese") || normalized.includes("ja") || normalized.includes("日本語")) {
    return "ja";
  }
  return "en";
}

export const strings = {
  en: {
    notFinancialAdvice:
      "Not financial advice. Crypto assets are volatile and may result in loss of capital. Check local regulations before trading.",
    cta: (exchange: string) => `Open an account on ${exchange} with our partner link`,
    titles: {
      deepDive: (base: string) => `${base} deep dive`,
      comparison: (base: string) => `${base} vs top alternatives`,
      howTo: (exchange: string, topic: string) => `How to use ${exchange} for ${topic}`,
      social: (base: string) => `60s ${base} highlight`,
      newsletter: (exchange: string, keyword: string) => `${exchange} weekly signal: ${keyword}`
    },
    meta: {
      title: "Title",
      publishDate: "Publish date",
      targetKeyword: "Target keyword",
      intent: "Intent",
      funnelStage: "Funnel stage",
      primaryOffers: "Primary offer focus",
      audience: "Audience"
    },
    sections: {
      overview: "Overview",
      keyBenefits: "Key benefits",
      pricingFees: "Pricing & fees",
      getStarted: "How to get started",
      faq: "FAQ",
      prerequisites: "Prerequisites",
      steps: "Step-by-step",
      commonMistakes: "Common mistakes",
      subjectLines: "Subject line ideas",
      body: "Body",
      internalLinks: "Internal links",
      featureComparison: "Feature comparison",
      verdict: "Verdict",
      script: "Script",
      onScreen: "On-screen text",
      cta: "CTA"
    }
  },
  ja: {
    notFinancialAdvice:
      "これは投資助言ではありません。暗号資産は価格変動が大きく、元本割れの可能性があります。取引前に各国の規制をご確認ください。",
    cta: (exchange: string) => `${exchange}の公式パートナーリンクから口座開設する`,
    titles: {
      deepDive: (base: string) => `${base}の徹底解説`,
      comparison: (base: string) => `${base}と主要な代替サービス比較`,
      howTo: (exchange: string, topic: string) => `${exchange}で${topic}を始める方法`,
      social: (base: string) => `${base}を60秒で解説`,
      newsletter: (exchange: string, keyword: string) => `${exchange}週次シグナル: ${keyword}`
    },
    meta: {
      title: "タイトル",
      publishDate: "公開日",
      targetKeyword: "ターゲットキーワード",
      intent: "検索意図",
      funnelStage: "ファネル段階",
      primaryOffers: "主要オファー",
      audience: "対象レベル"
    },
    sections: {
      overview: "概要",
      keyBenefits: "主なメリット",
      pricingFees: "料金・手数料",
      getStarted: "始め方",
      faq: "よくある質問",
      prerequisites: "事前準備",
      steps: "手順",
      commonMistakes: "よくある失敗",
      subjectLines: "件名案",
      body: "本文",
      internalLinks: "内部リンク",
      featureComparison: "機能比較",
      verdict: "結論",
      script: "台本",
      onScreen: "画面表示テキスト",
      cta: "行動喚起"
    }
  }
} satisfies Record<SupportedLanguage, Record<string, unknown>>;
