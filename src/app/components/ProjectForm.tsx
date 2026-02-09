"use client";

import { useState } from "react";
import { ProjectInput, ProjectData } from "@/lib/types";

const defaultInput: ProjectInput = {
  exchangeName: "",
  websiteUrl: "",
  targetCountries: ["US", "UK"],
  languages: ["English"],
  audienceLevel: "beginner",
  primaryOffers: ["spot", "staking"],
  affiliateModel: "rev_share",
  manualMode: false,
  manualNotes: ""
};

type Props = {
  onProjectCreated: (project: ProjectData) => void;
  onLoading: (loading: boolean) => void;
};

export default function ProjectForm({ onProjectCreated, onLoading }: Props) {
  const [input, setInput] = useState<ProjectInput>(defaultInput);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof ProjectInput, value: ProjectInput[keyof ProjectInput]) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    setError(null);
    onLoading(true);

    try {
      let crawl = undefined as unknown;
      if (!input.manualMode && input.websiteUrl) {
        const crawlRes = await fetch("/api/crawl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: input.websiteUrl })
        });
        if (crawlRes.ok) {
          const crawlJson = await crawlRes.json();
          crawl = crawlJson.data;
        }
      }

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, crawl })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Create failed");
      }

      const json = await res.json();
      onProjectCreated(json.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="card p-5 space-y-4">
      <div>
        <p className="text-lg font-display">Project Setup</p>
        <p className="text-xs text-white/60">SEO-first planning for affiliate conversions.</p>
      </div>

      <div className="space-y-2">
        <label className="label">Exchange name</label>
        <input
          className="input"
          value={input.exchangeName}
          onChange={(e) => update("exchangeName", e.target.value)}
          placeholder="Example Exchange"
        />
      </div>

      <div className="space-y-2">
        <label className="label">Website URL</label>
        <input
          className="input"
          value={input.websiteUrl}
          onChange={(e) => update("websiteUrl", e.target.value)}
          placeholder="https://example-exchange.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="label">Target countries</label>
          <input
            className="input"
            value={input.targetCountries.join(", ")}
            onChange={(e) => update("targetCountries", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))}
          />
        </div>
        <div className="space-y-2">
          <label className="label">Languages</label>
          <input
            className="input"
            value={input.languages.join(", ")}
            onChange={(e) => update("languages", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="label">Audience level</label>
          <select
            className="input"
            value={input.audienceLevel}
            onChange={(e) => update("audienceLevel", e.target.value as ProjectInput["audienceLevel"])}
          >
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="label">Affiliate model</label>
          <select
            className="input"
            value={input.affiliateModel}
            onChange={(e) => update("affiliateModel", e.target.value as ProjectInput["affiliateModel"])}
          >
            <option value="cpa">CPA</option>
            <option value="rev_share">Rev share</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="label">Primary offers</label>
        <input
          className="input"
          value={input.primaryOffers.join(", ")}
          onChange={(e) => update("primaryOffers", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))}
          placeholder="spot, futures, staking, card"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={input.manualMode}
          onChange={(e) => update("manualMode", e.target.checked)}
        />
        <span className="text-sm text-white/80">Manual inputs mode</span>
      </div>

      {input.manualMode && (
        <div className="space-y-2">
          <label className="label">Paste key pages and notes</label>
          <textarea
            className="input min-h-[120px]"
            value={input.manualNotes}
            onChange={(e) => update("manualNotes", e.target.value)}
            placeholder="Pricing/fees, products, regions, referral terms, etc."
          />
        </div>
      )}

      {error && <p className="text-xs text-red-300">{error}</p>}

      <button
        className="w-full rounded-lg bg-electric-600 px-4 py-2 text-sm font-semibold text-ink-900"
        onClick={handleCreate}
      >
        Generate Plan
      </button>
    </div>
  );
}
