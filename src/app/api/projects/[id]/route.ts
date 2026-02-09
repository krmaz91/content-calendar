import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const project = await prisma.project.findUnique({
    where: { id: params.id }
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      id: project.id,
      input: JSON.parse(project.input),
      sitemap: JSON.parse(project.sitemap),
      calendar: JSON.parse(project.calendar),
      createdAt: project.createdAt.toISOString()
    }
  });
}
