"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/app/components/ProjectForm";
import SitemapTree from "@/app/components/SitemapTree";
import CalendarTable from "@/app/components/CalendarTable";
import ExportPanel from "@/app/components/ExportPanel";
import DraftPanel from "@/app/components/DraftPanel";
import { ProjectData } from "@/lib/types";

type ProjectSummary = {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
};

export default function Home() {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    if (!res.ok) return;
    const json = await res.json();
    setProjects(json.data || []);
  };

  const loadProject = async (id: string) => {
    setLoading(true);
    const res = await fetch(`/api/projects/${id}`);
    if (res.ok) {
      const json = await res.json();
      setProject(json.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-3xl font-display">Content Calendar Builder</p>
        <p className="text-white/70 max-w-3xl">
          Build an SEO-first content plan for Web3 affiliate campaigns with deterministic generators,
          compliance reminders, and export-ready outputs.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_1fr]">
        <div className="space-y-4">
          <ProjectForm
            onProjectCreated={(data) => {
              setProject(data);
              loadProjects();
            }}
            onLoading={setLoading}
          />

          <div className="card p-4 space-y-2">
            <p className="text-sm font-semibold">Saved projects</p>
            {projects.length === 0 && (
              <p className="text-xs text-white/60">No saved projects yet.</p>
            )}
            <div className="space-y-2">
              {projects.map((item) => (
                <button
                  key={item.id}
                  className="w-full rounded-lg border border-white/10 px-3 py-2 text-left text-xs"
                  onClick={() => loadProject(item.id)}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-white/60">{item.websiteUrl}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="card p-4 text-sm text-white/60">Generating plan...</div>
          )}
          <SitemapTree nodes={project?.sitemap ?? []} />
          <ExportPanel project={project} />
          <DraftPanel project={project} />
        </div>

        <div className="space-y-4">
          <CalendarTable
            items={project?.calendar ?? []}
            input={project?.input}
            sitemap={project?.sitemap}
          />
        </div>
      </section>
    </main>
  );
}
