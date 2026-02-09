import { NextResponse } from "next/server";
import { crawlSite } from "@/lib/crawler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const data = await crawlSite(body.url);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Crawl failed" },
      { status: 500 }
    );
  }
}
