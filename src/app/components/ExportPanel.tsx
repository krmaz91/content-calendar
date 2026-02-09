"use client";

import { useMemo, useState } from "react";
import { calendarToCsv, calendarToNotionCsv, projectToJson, sitemapToMarkdown } from "@/lib/export";
import { ProjectData } from "@/lib/types";

export default function ExportPanel({ project }: { project: ProjectData | null }) {
  const [copied, setCopied] = useState<string | null>(null);

  const exports = useMemo(() => {
    if (!project) return null;
    return {
      csv: calendarToCsv(project.calendar),
      notionCsv: calendarToNotionCsv(project.calendar),
      json: projectToJson(project),
      markdown: sitemapToMarkdown(project.sitemap)
    };
  }, [project]);

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!project || !exports) {
    return (
      <div className="card p-5 text-sm text-white/60">
        Export files will be available after generation.
      </div>
    );
  }

  return (
    <div className="card p-5 space-y-3">
      <div>
        <p className="text-lg font-display">Export</p>
        <p className="text-xs text-white/60">Copy outputs into your workflow.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          className="rounded-lg border border-white/10 px-3 py-2 text-xs"
          onClick={() => copy(exports.csv, "CSV")}
        >
          Copy CSV
        </button>
        <button
          className="rounded-lg border border-white/10 px-3 py-2 text-xs"
          onClick={() => copy(exports.notionCsv, "Notion CSV")}
        >
          Copy Notion CSV
        </button>
        <button
          className="rounded-lg border border-white/10 px-3 py-2 text-xs"
          onClick={() => copy(exports.json, "JSON")}
        >
          Copy JSON
        </button>
        <button
          className="rounded-lg border border-white/10 px-3 py-2 text-xs"
          onClick={() => copy(exports.markdown, "Markdown")}
        >
          Copy Markdown
        </button>
      </div>

      {copied && <p className="text-xs text-lime-500">Copied {copied}.</p>}
    </div>
  );
}
