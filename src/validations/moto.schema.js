import { z } from "zod";

export const createMotorSchema = z.object({
  model: z.string().trim().min(3, "Enter 3 character of model"),
  motorBrandId: z.number({ error: "Selcect one brand" }).int().positive(),
  type: z.enum(["AUTOMATIC", "MANUAL"], {
    error: "Motor type must be either Automatic or Manual",
  }),
});

export const updateMotorSchema = z.object({
  model: z.string().trim().min(1).optional(),
  motorBrandId: z.number().int().positive().optional(),
  type: z.enum(["AUTOMATIC", "MANUAL"]).optional(),
  isActive: z.boolean().optional(),
});
