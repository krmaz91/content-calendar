import { PrismaClient } from "@prisma/client";
import { generateSitemap } from "../src/lib/generators/sitemap";
import { generateCalendar } from "../src/lib/generators/calendar";
import { ProjectInput } from "../src/lib/types";

const prisma = new PrismaClient();

async function main() {
  const input: ProjectInput = {
    exchangeName: "NovaX",
    websiteUrl: "https://novax.example",
    targetCountries: ["US", "CA", "UK"],
    languages: ["English"],
    audienceLevel: "beginner",
    primaryOffers: ["spot", "staking", "futures", "cards"],
    affiliateModel: "rev_share",
    manualMode: true,
    manualNotes: "Tiered fees, staking APY, card cashback, futures leverage up to 10x"
  };

  const sitemap = generateSitemap(input);
  const calendar = generateCalendar(input, sitemap, 12);

  await prisma.project.create({
    data: {
      name: input.exchangeName,
      websiteUrl: input.websiteUrl,
      input: JSON.stringify(input),
      sitemap: JSON.stringify(sitemap),
      calendar: JSON.stringify(calendar)
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
