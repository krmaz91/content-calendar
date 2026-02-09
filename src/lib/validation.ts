import { z } from "zod";

export const projectInputSchema = z.object({
  exchangeName: z.string().min(2),
  websiteUrl: z.string().url(),
  targetCountries: z.array(z.string().min(2)).min(1),
  languages: z.array(z.string().min(2)).min(1),
  audienceLevel: z.enum(["beginner", "advanced"]),
  primaryOffers: z.array(z.string().min(2)).min(1),
  affiliateModel: z.enum(["cpa", "rev_share", "hybrid"]),
  manualMode: z.boolean(),
  manualNotes: z.string().optional()
});

export const createProjectSchema = z.object({
  input: projectInputSchema
});

export type ProjectInputSchema = z.infer<typeof projectInputSchema>;
