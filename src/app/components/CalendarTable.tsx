"use client";

import { useMemo, useState } from "react";
import { CalendarItem, ProjectInput, SitemapNode } from "@/lib/types";
import { buildDraft } from "@/lib/generators/drafts";

type Props = {
  items: CalendarItem[];
  input?: ProjectInput;
  sitemap?: SitemapNode[];
};

export default function CalendarTable({ items, input, sitemap }: Props) {
  const [funnel, setFunnel] = useState("all");
  const [type, setType] = useState("all");
  const [effort, setEffort] = useState("all");
  const [weeks, setWeeks] = useState<4 | 12>(4);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items
      .filter((item) => (weeks === 4 ? item.week <= 4 : true))
      .filter((item) => (funnel === "all" ? true : item.funnelStage === funnel))
      .filter((item) => (type === "all" ? true : item.contentType === type))
      .filter((item) => (effort === "all" ? true : item.effort === effort));
  }, [items, funnel, type, effort, weeks]);

  const canDraft = Boolean(input && sitemap);

  const copyDraft = async (item: CalendarItem) => {
    if (!input || !sitemap) return;
    const content = buildDraft(item, input, sitemap);
    await navigator.clipboard.writeText(content);
    setCopied(item.title);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!items.length) {
    return (
      <div className="card p-5 text-sm text-white/60">
        Your calendar will appear here once generated.
      </div>
    );
  }

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-display">Content Calendar</p>
          <p className="text-xs text-white/60">SEO-first schedule with repurposing ideas.</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            className={`badge ${weeks === 4 ? "bg-lime-500 text-ink-900" : ""}`}
            onClick={() => setWeeks(4)}
          >
            4 weeks
          </button>
          <button
            className={`badge ${weeks === 12 ? "bg-lime-500 text-ink-900" : ""}`}
            onClick={() => setWeeks(12)}
          >
            12 weeks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <select className="input" value={funnel} onChange={(e) => setFunnel(e.target.value)}>
          <option value="all">All funnel stages</option>
          <option value="TOFU">TOFU</option>
          <option value="MOFU">MOFU</option>
          <option value="BOFU">BOFU</option>
        </select>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All content types</option>
          <option value="longform">Longform</option>
          <option value="comparison">Comparison</option>
          <option value="how_to">How-to</option>
          <option value="social_short">Social short</option>
          <option value="newsletter">Newsletter</option>
        </select>
        <select className="input" value={effort} onChange={(e) => setEffort(e.target.value)}>
          <option value="all">All effort</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Title</th>
              <th>Type</th>
              <th>Keyword</th>
              <th>CTA</th>
              <th>Effort</th>
              <th>Draft</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.week}</td>
                <td>{item.publishDate}</td>
                <td>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-white/60">{item.repurposeTo.join(" · ")}</p>
                  <p className="text-xs text-white/60">{item.complianceNote}</p>
                </td>
                <td>{item.contentType}</td>
                <td>{item.targetKeyword}</td>
                <td>{item.cta}</td>
                <td>{item.effort}</td>
                <td>
                  <button
                    className="rounded-lg border border-white/10 px-3 py-1 text-xs disabled:opacity-50"
                    onClick={() => copyDraft(item)}
                    disabled={!canDraft}
                  >
                    Copy draft
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {copied && <p className="text-xs text-lime-500">Copied draft for {copied}.</p>}
    </div>
  );
}
