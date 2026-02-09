import { SitemapNode } from "@/lib/types";

export default function SitemapTree({ nodes }: { nodes: SitemapNode[] }) {
  if (!nodes.length) {
    return (
      <div className="card p-5 text-sm text-white/60">
        Generate a project to see the sitemap structure.
      </div>
    );
  }

  return (
    <div className="card p-5 space-y-4">
      <div>
        <p className="text-lg font-display">Site Structure</p>
        <p className="text-xs text-white/60">Sitemap with SEO targets and CTAs.</p>
      </div>
      <div className="space-y-3">
        {nodes.map((node) => (
          <div key={node.id} className="rounded-xl border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{node.title}</p>
              <span className="badge">{node.funnelStage}</span>
            </div>
            <p className="text-xs text-white/60">{node.slug}</p>
            <div className="mt-2 text-xs text-white/70">
              <p>Primary keyword: {node.primaryKeyword}</p>
              <p>Secondary: {node.secondaryKeywords.join(", ")}</p>
              <p>Intent: {node.intent}</p>
              <p>Internal links: {node.internalLinks.join(", ")}</p>
              <p>CTA placements: {node.ctaPlacements.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
