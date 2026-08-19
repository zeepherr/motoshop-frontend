import { z } from "zod";
export const createServiceSchema = z.object({
  name: z.string().trim().min(1, "Service name is required"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .transform((value) => value || undefined),

  price: z.coerce.number().positive("Price must be greater than 0"),
});

export const updateServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Service name is required")
    .max(100, "Service name must be less than 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .nullable()
    .optional(),

  price: z.coerce.number().positive("Price must be greater than 0").optional(),
});
