"use client";

import { useMemo, useState } from "react";
import { ProjectData } from "@/lib/types";
import { buildDraft, buildDraftBundle } from "@/lib/generators/drafts";

export default function DraftPanel({ project }: { project: ProjectData | null }) {
  const [copied, setCopied] = useState<string | null>(null);

  const drafts = useMemo(() => {
    if (!project) return null;
    return project.calendar.map((item) => ({
      id: item.id,
      title: item.title,
      content: buildDraft(item, project.input, project.sitemap)
    }));
  }, [project]);

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!project || !drafts) {
    return (
      <div className="card p-5 text-sm text-white/60">
        Draft content will appear after generation.
      </div>
    );
  }

  return (
    <div className="card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-display">Draft Content</p>
          <p className="text-xs text-white/60">Deterministic templates for each calendar item.</p>
        </div>
        <button
          className="rounded-lg border border-white/10 px-3 py-2 text-xs"
          onClick={() =>
            copy(buildDraftBundle(project.calendar, project.input, project.sitemap), "All drafts")
          }
        >
          Copy all drafts
        </button>
      </div>

      <div className="space-y-2">
        {drafts.slice(0, 4).map((draft) => (
          <div key={draft.id} className="rounded-xl border border-white/10 p-3">
            <p className="text-sm font-semibold">{draft.title}</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                className="rounded-lg border border-white/10 px-3 py-2 text-xs"
                onClick={() => copy(draft.content, draft.title)}
              >
                Copy draft
              </button>
              <span className="text-xs text-white/60">Markdown template</span>
            </div>
          </div>
        ))}
      </div>

      {copied && <p className="text-xs text-lime-500">Copied {copied}.</p>}
      <p className="text-xs text-white/50">
        Showing first 4 drafts. Use “Copy all drafts” to get everything.
      </p>
    </div>
  );
}
