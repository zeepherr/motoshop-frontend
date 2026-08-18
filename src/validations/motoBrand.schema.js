import { z } from "zod";

export const motoBrandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Brand name is required")
    .max(50, "Brand name must be 50 characters or less"),
});
