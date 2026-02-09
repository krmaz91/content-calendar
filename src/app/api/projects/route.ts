import { NextResponse } from "next/server";
import { ensureProjectTable, prisma } from "@/lib/db";
import { createProjectSchema } from "@/lib/validation";
import { generateSitemap } from "@/lib/generators/sitemap";
import { generateCalendar } from "@/lib/generators/calendar";
import { ProjectData } from "@/lib/types";

export async function GET() {
  await ensureProjectTable();
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({
    data: projects.map((project) => ({
      id: project.id,
      name: project.name,
      websiteUrl: project.websiteUrl,
      createdAt: project.createdAt
    }))
  });
}

export async function POST(req: Request) {
  try {
    await ensureProjectTable();
    const body = await req.json();
    const parsed = createProjectSchema.parse(body);
    const crawl = body.crawl || undefined;

    const sitemap = generateSitemap(parsed.input, crawl);
    const calendar = generateCalendar(parsed.input, sitemap, 12);

    const project = await prisma.project.create({
      data: {
        name: parsed.input.exchangeName,
        websiteUrl: parsed.input.websiteUrl,
        input: JSON.stringify(parsed.input),
        sitemap: JSON.stringify(sitemap),
        calendar: JSON.stringify(calendar)
      }
    });

    const payload: ProjectData = {
      id: project.id,
      input: parsed.input,
      sitemap,
      calendar,
      createdAt: project.createdAt.toISOString()
    };

    return NextResponse.json({ data: payload });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Unable to create project" },
      { status: 400 }
    );
  }
}
